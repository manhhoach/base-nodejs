import { IsString, IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
