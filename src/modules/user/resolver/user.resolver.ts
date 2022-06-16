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
    ) { }

    @Mutation(() => String)
    async sendVerSMS(
        @Args('phoneNumber', { type: () => String }) phoneNumber: string,
    ) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const filteredPhoneNumber = phoneNumber.replace(/\D/g, '');
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
        const checkSmsVer = await this.userService.checkSMSVerification({
            phoneNumber,
            code,
        });
        const userGraph: UserGraph = new UserGraph({
            ...checkSmsVer,
        });
        return userGraph;
    }

    @Mutation(() => UserGraph)
    @Roles('user', 'secretary')
    @UseGuards(PreAuthGuard)
    async registerUser(
        @Args() args: CreateUser,
        @CurrentUserGraph() user: User | Secretary,
        @CurrentTokenPayload() payload: Token,
    ) {
        if (payload.role === TokenRoles.Secretary) {
            const insertPhoneNumber = await this.userService.insertOne({
                phoneNumber: args.phoneNumber.replace(/\D/g, ''),
            } as any);
            const createUser = await this.userService.createUser({
                ...args,
                _id: insertPhoneNumber.toHexString(),
            });
            return createUser;
        }
        const createUser = await this.userService.createUser({
            ...args,
            _id: user._id.toHexString(),
        });
        const userResponce = new UserGraph({ ...createUser });
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
