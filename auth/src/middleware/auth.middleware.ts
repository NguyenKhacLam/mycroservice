import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

declare module 'express-session' {
  export interface SessionData {
    jwt: string;
    user: { [key: string]: any };
  }
}

@Injectable()
export class AuthSessionMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session || !req.session?.jwt) {
      return next();
    }

    try {
      const payload = this.jwtService.verify(req.session.jwt, {
        secret: process.env.JWT_KEY ? process.env.JWT_KEY : 'lamnk',
      });

      req.session.user = payload;
    } catch (error) {
      res.send({ currentUser: null });
    }
    next();
  }
}
