import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import * as jwt from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";
import { EasyconfigService } from "nestjs-easyconfig";
import { Request, Response } from "express";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor (private config: EasyconfigService) {}

  use(req: Request, res: Response, next: () => void) {
    const AUTH0_DOMAIN = this.config.get('AUTH0_DOMAIN');
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
      
      audience: `${this.config.get('APP_DOMAIN')}:${this.config.get('APP_PORT')}`,
      //NOTE: that '/' at the end is important, seriously.
      issuer: `https://${AUTH0_DOMAIN}/`, 
      algorithm: 'RS256',
    })
    (req, res, err => {
      if (err) {
        const status = err.status || 500;
        const message = err.message || 'Sorry, your process has been eaten by our mascot dog';
        throw new HttpException(message,status);
      }
      
      next();
    })    
  }
}
