import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Desease } from '../model/desease.model';
import { DeseaseService } from '../service/desease.service';
import { CreateDeseaseInput } from '../model/desease.inputs';

@Resolver(() => Desease)
export class DeseaseResolver {
    constructor(private deseaseSerivce: DeseaseService) {}

    @Mutation(() => Desease)
    async createPerson(@Args('payload') payload: CreateDeseaseInput) {
        return this.deseaseSerivce.create(payload);
    }
}
