import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { customController } from '../../common/custom-controller';
import { responseSucess } from './../../common/response';

@Controller('users')
export class UserController {
  @Get()
  getMe(@Req() req) {
    return responseSucess(HttpStatus.OK, req.user);
  }
}
