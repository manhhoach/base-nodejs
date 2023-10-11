import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { MESSAGES } from '../../common/messages';
import { SignInDto } from './dto/sign-in.dto';

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

  async login(loginDto: SignInDto) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('email = :email', { email: loginDto.email })
      .addSelect('users.password')
      .getOne();

    if (!user) throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);

    if (!user.comparePassword(loginDto.password))
      throw new UnauthorizedException(MESSAGES.INCORRECT_PASSWORD);

    const payload = { id: user.id };
    return {
      ...user,
      password: undefined,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async decodeToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOneBy({ id: payload.id });
      if (user) return user;
      throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
