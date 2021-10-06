import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { Modify } from 'src/utils/modifyType';
import { Admin } from '../model/admin.interface';
import { CreateAdmin } from '../model/createAdmin.args';
import * as bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class AdminService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private tokenService: TokenService,
    ) {}

    private get adminCollection() {
        return this.database.collection('admin');
    }

    async createAdmin(args: CreateAdmin) {
        const { phoneNumber: _phoneNumber, password } = args;
        const phoneNumber = _phoneNumber.replace(/\D/g, '');
        const passwordHASH = await bcrypt.hash(password, 12);
        const admin: Modify<Admin, { _id?: ObjectId }> & { token?: string } = {
            ...args,
            passwordHASH,
            phoneNumber,
        };
        const insertAdmin = await this.adminCollection.insertOne(admin);
        const token = this.tokenService.create({
            user: { ...admin, _id: insertAdmin.insertedId.toHexString() },
            role: TokenRoles.Admin,
        });
        [admin._id, admin.token] = [insertAdmin.insertedId, token];
        return admin;
    }

    async findOne(args: Partial<Admin>) {
        const admin = await this.adminCollection.findOne<Admin>(args);
        return admin;
    }

    async login(args: {
        email?: string;
        phoneNumber?: string;
        password: string;
    }) {
        const { email, phoneNumber, password } = args;
        const admin: Admin & { token?: string } = email
            ? await this.findOne({ email })
            : await this.findOne({ phoneNumber });
        if (!admin) throw new ApolloError('email or phone number is wrong');
        const checkPassword = await bcrypt.compare(
            password,
            admin.passwordHASH,
        );
        if (!checkPassword) throw new ApolloError('password is wrong');
        const token = this.tokenService.create({
            user: { ...admin, _id: admin._id.toHexString() },
            role: TokenRoles.Admin,
        });
        admin.token = token;
        return admin;
    }

    async edit(args: Partial<Omit<Admin, '_id'>> & { _id: ObjectId }): Promise<Admin> {
        const admin = await this.adminCollection.findOneAndUpdate(
            { _id: args._id },
            args as Partial<Omit<Admin, '_id'>>,
            { returnDocument: 'after' },
        );
        return admin.value as Admin;
    };
};
