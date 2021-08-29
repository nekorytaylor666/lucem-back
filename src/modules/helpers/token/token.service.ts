import { Injectable } from '@nestjs/common';
import { Token } from "./token.interface"
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/user/model/user.interface';
import { PrivateKey, PublicKey } from './token.keys';
import { signOption } from './token.signOptions';

@Injectable()
export class TokenService {
  create(args: { user: User }): string {
    const { user } = args;
    const payload: Token = {
        ...user
    };
    const token: string = jwt.sign(payload, PrivateKey, signOption);
    return token;
  }

  verify(args: { token: string }): Token {
    const { token } = args;
    const tokenValues = jwt.verify(token, PublicKey) as Token;
    return tokenValues;
  }
}
