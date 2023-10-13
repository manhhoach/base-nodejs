import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SkipAuth } from './skip.auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { customController } from '../../common/custom-controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipAuth()
  @Post('/login')
  async login(@Body() signInDto: SignInDto) {
    return customController(this.authService.login(signInDto), HttpStatus.OK);
  }

  @SkipAuth()
  @Post('/register')
  async register(@Body() createUserDto: SignUpDto) {
    return customController(this.authService.register(createUserDto), HttpStatus.CREATED);
  }
}
