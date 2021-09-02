import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Desease } from '../model/desease.model';
import { DeseaseService } from '../service/desease.service';
import { CreateDeseaseInput } from '../model/desease.inputs';

@Resolver(() => Desease)
export class DeseaseResolver {
    constructor(private deseaseSerivce: DeseaseService) {}

    @Mutation(() => Desease)
    async createDesease(@Args('payload') payload: CreateDeseaseInput) {
        return this.deseaseSerivce.create(payload);
    }

    @Query(() => [Desease])
    async getDesease() {
        return this.deseaseSerivce.list();
    }
}
