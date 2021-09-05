import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateService } from "../model/createService.args";
import { ServiceGraph } from "../model/service.model";
import { ServiceService } from "../service/service.service";


@Resolver()
export class ServiceResolver {
    constructor(private serviceService: ServiceService) {}

    @Mutation(() => ServiceGraph)
    async createService(@Args() args: CreateService) {
        const insertService = await this.serviceService.create(args);
        const serviceResponce = new ServiceGraph({...insertService});
        return serviceResponce;
    }
}