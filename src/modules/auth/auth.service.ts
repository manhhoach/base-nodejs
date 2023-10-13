import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGES } from '../../common/messages';
import { UserEntity } from '../user/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async register(signUpDto: SignUpDto) {
    const user = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });
    if (user) {
      throw new BadRequestException(MESSAGES.EMAIL_EXISTS);
    }
    return this.userRepository.save(Object.assign(new UserEntity(), signUpDto));
  }

  async login(signInDto: SignInDto) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('email = :email', { email: signInDto.email })
      .addSelect('users.password')
      .getOne();

    if (!user) throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);

    if (!user.comparePassword(signInDto.password)) throw new UnauthorizedException(MESSAGES.INCORRECT_PASSWORD);

    const payload = { id: user.id };
    return {
      ...user,
      password: undefined,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async decodeToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);

    const user: any = await this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id: payload.id })
      .leftJoin('users.role', 'roles')
      .leftJoin('roles.role_permissions', 'role_permissions')
      .leftJoin('role_permissions.permission', 'permissions')
      .select([
        'users.id',
        'users.email',
        'users.name',
        'roles.name',
        'role_permissions.permission_id',
        'permissions.name',
      ])
      .cache(10000)
      .getOne();

    if (user) {
      user.permissions = user.role.role_permissions.map((ele) => ele.permission.name);
      user.role = user.role.name;
      return user;
    }
    throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
  }
}
