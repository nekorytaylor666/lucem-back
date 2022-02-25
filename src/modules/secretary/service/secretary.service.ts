import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { DATABASE_CONNECTION } from 'src/modules/helpers/database/mongo.provider';
import { Secretary } from '../model/secretary.interface';
import * as bcrypt from 'bcryptjs';
import { CreateSecretary } from '../model/createSecretary.args';

@Injectable()
export class SecretaryService extends BasicService<Secretary> {
    constructor(@Inject(DATABASE_CONNECTION) private database: Db) {
        super();
        this.dbService = this.database.collection('secretary');
    }

    async create(args: CreateSecretary) {
        const { phoneNumber: _phoneNumber, password } = args;
        const passwordHASH = await bcrypt.hash(password, 12);
        const phoneNumber = _phoneNumber.replace(/\D/g, '');
        const secretary: Secretary = {
            ...args,
            _id: new ObjectId(),
            passwordHASH,
            phoneNumber,
        };
        await this.insertOne(secretary);
        return secretary;
    }
}
