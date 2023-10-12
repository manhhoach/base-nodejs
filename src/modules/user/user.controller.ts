import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { customReturn } from './../../common/custom.return';
import { responseSucess } from './../../common/response';

@Controller('users')
export class UserController {
  @Get()
  getMe(@Req() req) {
    return responseSucess(HttpStatus.OK, req.user);
  }
}
