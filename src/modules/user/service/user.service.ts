import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { CreateUser } from '../model/createUser.args';
import { User } from '../model/user.interface';
import * as bcrypt from 'bcryptjs';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { AWSservice } from 'src/modules/helpers/uploadFiles/aws/AWS.service';
import { Cache } from 'cache-manager';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class UserService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
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

    async checkSMSVerification(args: { phoneNumber: string; code: string }) {
        const { phoneNumber, code } = args;
        const filteredPhoneNumber = phoneNumber.replace(/\D/g, '');
        const originalCode = await this.cacheService.get(
            `${filteredPhoneNumber}`,
        );
        if (code !== originalCode) throw new ApolloError('The code is wrong');

        const insertPhoneNumber = (
            await this.userCollection.findOneAndUpdate(
                { phoneNumber: filteredPhoneNumber },
                {
                    $set: {
                        phoneNumber: filteredPhoneNumber,
                    },
                },
                {
                    upsert: true,
                    returnDocument: 'after',
                },
            )
        ).value;
        const token = this.tokenService.create({
            user: {
                phoneNumber: insertPhoneNumber.phoneNumber,
                _id: insertPhoneNumber._id.toHexString(),
            },
            role: TokenRoles.User,
        });
        const user: User = {
            ...insertPhoneNumber,
            token,
        };
        return user;
    }

    async createUser(newUser: CreateUser & { _id: string }): Promise<User> {
        const {
            password,
            dateOfBirth: _dateOfBirth,
            avatar,
            _id,
            phoneNumber: _phoneNumber,
            email,
            fullName,
        } = newUser;
        const passwordHASH = await bcrypt.hash(password, 12);
        const phoneNumber = _phoneNumber.replace(/\D/g, '');
        const dateOfBirth = new Date(_dateOfBirth);
        const photoURL =
            avatar &&
            (await this.photoUploadService.saveImages(
                (await avatar).createReadStream(),
            ));
        const insertUser = await this.userCollection.findOneAndUpdate(
            { _id: new ObjectId(_id), phoneNumber },
            {
                $set: {
                    email,
                    fullName,
                    dateOfBirth,
                    passwordHASH,
                    photoURL,
                },
            },
            {
                returnDocument: "after"
            }
        );
        const token = this.tokenService.create({
            user: { ...insertUser, _id: insertUser.value._id.toHexString() },
            role: TokenRoles.User,
        });
        insertUser.value.token = token;
        return insertUser.value;
    }
}
