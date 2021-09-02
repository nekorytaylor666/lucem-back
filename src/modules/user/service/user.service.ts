import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { CreateUser } from '../model/createUser.args';
import { User } from '../model/user.interface';
import * as bcrypt from 'bcryptjs';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { AWSservice } from 'src/modules/helpers/uploadFiles/aws/AWS.service';

@Injectable()
export class UserService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private tokenService: TokenService,
        private photoUploadService: AWSservice,
    ) {}

    get userCollection() {
        const collection = this.database.collection<User>('user');
        return collection;
    }

    async findOne(user: Partial<User>): Promise<User> {
        const userResponce = this.userCollection.findOne(user);
        return userResponce;
    }

    async insertOne(user: Omit<User, '_id'>) {
        const insertUser = await this.userCollection.insertOne(user);
        const userReponce: User = {
            ...user,
            _id: insertUser.insertedId,
        };
        return userReponce;
    }

    async createUser(newUser: CreateUser): Promise<User> {
        const { password, dateOfBirth: _dateOfBirth, avatar } = newUser;
        const passwordHASH = await bcrypt.hash(password, 12);
        const dateOfBirth = new Date(_dateOfBirth);
        const photoURL =
            avatar &&
            (await this.photoUploadService.saveImages(
                (await avatar).createReadStream(),
            ));
        const insertUser = await this.insertOne({
            ...newUser,
            dateOfBirth,
            passwordHASH,
            photoURL,
        });
        const token = this.tokenService.create({
            user: { ...insertUser },
            role: TokenRoles.User,
        });
        insertUser.token = token;
        return insertUser;
    }
}
