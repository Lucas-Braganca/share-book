import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secretToken } from '../../common/constants';
import { JwtPayload } from '../dto/response/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /* istanbul ignore next */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretToken,
    });
  }

  async validate(payload: JwtPayload) {
    /* istanbul ignore next */
    return payload;
  }
}
