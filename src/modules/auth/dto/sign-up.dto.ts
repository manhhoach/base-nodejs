import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  password: string;

}
