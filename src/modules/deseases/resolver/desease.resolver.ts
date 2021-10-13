import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeseaseGraph } from '../model/desease.graph';
import { DeseaseService } from '../service/desease.service';
import { CreateDeseaseInput } from '../model/desease.inputs';

@Resolver(() => DeseaseGraph)
export class DeseaseResolver {
    constructor(private deseaseSerivce: DeseaseService) {}

    @Mutation(() => DeseaseGraph)
    async createDesease(@Args('payload') payload: CreateDeseaseInput) {
        const createDesease = await this.deseaseSerivce.create(payload);
        const deseaseResponce = new DeseaseGraph({ ...createDesease });
        return deseaseResponce;
    }

    @Query(() => [DeseaseGraph])
    async getDesease() {
        return await this.deseaseSerivce.list();
    }
}
