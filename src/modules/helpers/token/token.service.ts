import { Injectable } from '@nestjs/common';
import { Token, TokenRoles } from './token.interface';
import * as jwt from 'jsonwebtoken';
import { PrivateKey, PublicKey } from './token.keys';
import { signOption } from './token.signOptions';

@Injectable()
export class TokenService {
    create(args: { user: Omit<Token, 'role'>; role: TokenRoles }): string {
        const { user, role } = args;
        const payload: Token = {
            ...user,
            role,
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
