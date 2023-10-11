import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IS_SKIP_AUTH } from './constant';
import { MESSAGES } from '../../common/messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isSkipAuth) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(MESSAGES.TOKEN_NOT_FOUND);
    }
    try {
      const user = await this.authService.decodeToken(token);
      request.user = user;
    } catch (err) {
      throw err;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
