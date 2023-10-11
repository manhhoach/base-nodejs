import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './../../config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.registerAsync(jwtConfig)],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
