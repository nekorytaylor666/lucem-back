import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { CreateSecretary } from '../model/createSecretary.args';
import { TokenSecretaryGraph } from '../model/secretary.model';
import { SecretaryService } from '../service/secretary.service';
import * as bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class SecretaryResolver {
    constructor(
        private secretaryService: SecretaryService,
        private tokenService: TokenService,
    ) {}

    @Mutation(() => TokenSecretaryGraph)
    async registerSecretary(@Args() args: CreateSecretary) {
        const secretary = await this.secretaryService.create(args);
        const token = this.tokenService.create({
            user: {
                _id: secretary._id.toHexString(),
                email: secretary.email,
                phoneNumber: secretary.phoneNumber,
            },
            role: TokenRoles.Secretary,
        });
        const secretaryResponce = new TokenSecretaryGraph({
            token,
            secretary,
        });
        return secretaryResponce;
    }

    @Query(() => TokenSecretaryGraph)
    async loginAsSecretary(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const secretary = await this.secretaryService.findOne({ email });
        const checkPassword = await bcrypt.compare(
            password,
            secretary.passwordHASH,
        );
        if (!secretary || !checkPassword)
            throw new ApolloError('the password or email are wrong');
        const token = await this.tokenService.create({
            user: {
                _id: secretary._id.toHexString(),
                email: secretary.email,
                phoneNumber: secretary.phoneNumber,
            },
            role: TokenRoles.Secretary,
        });
        const secretaryResponce = new TokenSecretaryGraph({
            token,
            secretary,
        });
        return secretaryResponce;
    }
}
