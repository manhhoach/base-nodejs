import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '7d',
      },
    };
  },
};
