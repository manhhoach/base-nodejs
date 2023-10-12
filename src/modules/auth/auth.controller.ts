import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SkipAuth } from './skip.auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { customReturn } from './../../common/custom.return';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipAuth()
  @Post('/login')
  async login(@Body() signInDto: SignInDto) {
    return customReturn(this.authService.login(signInDto), HttpStatus.OK);
  }

  @SkipAuth()
  @Post('/register')
  async register(@Body() createUserDto: SignUpDto) {
    return customReturn(this.authService.register(createUserDto), HttpStatus.CREATED);
  }
}
