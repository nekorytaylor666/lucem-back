import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUserGraph, PreAuthGuardUser } from 'src/modules/helpers/auth/auth.service';
import { SMSService } from 'src/modules/helpers/SMS/SMS.service';
import { CreateUser } from '../model/createUser.args';
import { UserGraph } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Cache } from 'cache-manager';
import { User } from '../model/user.interface';


@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
        private smsService: SMSService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    @Mutation(() => String)
    async sendVerSMS(
        @Args('phoneNumber', { type: () => String }) phoneNumber: string,
    ) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const filteredPhoneNumber = phoneNumber.replace(/\D/g, '');
        this.smsService.sendVerificationSMS({
            code,
            phoneNumber: filteredPhoneNumber,
        });
        await this.cacheService.set(`${filteredPhoneNumber}`, `${code}`, {
            ttl: 300,
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
    @UseGuards(PreAuthGuardUser)
    async registerUser(@Args() args: CreateUser, @CurrentUserGraph() user: User) {
        const createUser = await this.userService.createUser({...args, _id: user._id.toHexString()});
        const userResponce = new UserGraph({ ...createUser });
        return userResponce;
    }

    @Query(() => String)
    async helloWorld() {
        return 'hello world';
    }
}
