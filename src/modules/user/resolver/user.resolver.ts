import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { SMSService } from 'src/modules/helpers/SMS/SMS.service';
import { CreateUser } from '../model/createUser.args';
import { UserGraph } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Cache } from 'cache-manager';
import { User } from '../model/user.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { ObjectId } from 'mongodb';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { EditUser } from '../model/editUser.args';
import { ApolloError } from 'apollo-server-express';
import { Secretary } from 'src/modules/secretary/model/secretary.interface';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
        private smsService: SMSService,
        private tokenService: TokenService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    @Mutation(() => String)
    async sendVerSMS(
        @Args('phoneNumber', { type: () => String }) phoneNumber: string,
    ) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const filteredPhoneNumber = phoneNumber.replace(/\D/g, '');
        console.log(code);
        await this.smsService.sendVerificationSMS({
            code,
            phoneNumber: filteredPhoneNumber,
        });
        await this.cacheService.set(`${filteredPhoneNumber}`, `${code}`, {
            ttl: 600000,
        });
        return 'success';
    }

    @Mutation(() => UserGraph)
    async checkSMSVerificationCode(
        @Args('phoneNumber', { type: () => String }) phoneNumber: string,
        @Args('code', { type: () => String }) code: string,
    ): Promise<UserGraph> {
        try {
            const checkSmsVer = await this.userService.checkSMSVerification({
                phoneNumber,
                code,
            });
            const userGraph: UserGraph = new UserGraph({
                ...checkSmsVer,
            });
            return userGraph;
        } catch (error) {
            throw new ApolloError(error);
        }
    }

    @Mutation(() => UserGraph)
    async registerUser(
        @Args() args: CreateUser,
        @CurrentTokenPayload() payload: Token,
    ) {
        const emptyUserWithPhoneNumber = await this.userService.findOne({
            phoneNumber: args.phoneNumber.replace(/\D/g, ''),
        } as any);
        const createUser = await this.userService.createUser({
            ...args,
            _id: emptyUserWithPhoneNumber._id.toHexString(),
        });

        const userResponce = new UserGraph({ ...createUser });
        return userResponce;
    }

    // check if user exists by phone number
    @Query(() => UserGraph)
    async getUserByPhoneNumber(
        @Args('phoneNumber', { type: () => String }) phoneNumber: string,
    ) {
        const user = await this.userService.findOne({
            phoneNumber: phoneNumber.replace(/\D/g, ''),
        });
        // if user not found throw error since we create user by phone number we need to check if other info was filled
        if (!user.email) throw new ApolloError('user not found');
        const userResponce = new UserGraph({ ...user });
        return userResponce;
    }

    @Query(() => UserGraph)
    async loginUser(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        console.log('loginUser', email, password);
        const user = await this.userService.login({ email, password });
        const token = this.tokenService.create({
            user: {
                ...user,
                _id: user._id.toHexString(),
            },
            role: TokenRoles.User,
        });
        const userWithToken = { ...user, token };
        const userResponce = new UserGraph({ ...userWithToken });
        return userResponce;
    }

    @Query(() => UserGraph)
    async getUserByID(@Args('userId', { type: () => String }) userId: string) {
        const user = await this.userService.findOne({
            _id: new ObjectId(userId),
        });
        const userResponce = new UserGraph({ ...user });
        return userResponce;
    }

    @Query(() => [UserGraph])
    async listUsers() {
        const users = await this.userService.findWithOptions({
            fields: ['fullName'],
            values: [{ $exists: true }],
        });
        const usersResponce = users.map((val) => new UserGraph({ ...val }));
        return usersResponce;
    }

    @Mutation(() => UserGraph)
    @Roles('user', 'admin', 'doctor')
    @UseGuards(PreAuthGuard)
    async editUser(
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() _user: { _id: ObjectId },
        @Args() args: EditUser,
    ) {
        const user =
            payload.role === TokenRoles.User
                ? await this.userService.edit({
                      ...args,
                      userId: _user._id.toHexString(),
                  })
                : payload.role === TokenRoles.Admin ||
                  payload.role === TokenRoles.Doctor
                ? await this.userService.edit({
                      peculiarities: args.peculiarities,
                      userId: args.userId,
                  })
                : undefined;
        if (!user) throw new ApolloError("you don't have access rights");
        const userResponce = new UserGraph({ ...user });
        return userResponce;
    }
}
