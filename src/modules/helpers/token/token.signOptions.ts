import * as jwt from 'jsonwebtoken';

export const signOption: jwt.SignOptions = {
    issuer: '',
    subject: '',
    audience: '',
    expiresIn: '365d',
    algorithm: 'RS256',
};
