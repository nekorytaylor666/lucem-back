import { join } from 'path';
import * as fs from 'fs';

const pathToPublicKey = join(process.cwd(), 'publicKey.cer');
const pathToPrivateKey = join(process.cwd(), 'privateKey.cer');

export const PublicKey = fs.readFileSync(pathToPublicKey, {
    encoding: 'utf-8',
});

export const PrivateKey = fs.readFileSync(pathToPrivateKey, {
    encoding: 'utf-8',
});
