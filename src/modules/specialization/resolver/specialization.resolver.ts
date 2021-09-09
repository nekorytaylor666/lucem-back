import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateSpecialization } from "../model/createSpecialization.args";
import { SpecializationGraph } from "../model/specialization.model";
import { SpecializationService } from "../service/specialization.service";



@Resolver()
export class SpecializationResolver {
    constructor(private specializationService: SpecializationService) {}

    @Mutation(() => SpecializationGraph)
    async createSpecialization(@Args() args: CreateSpecialization) {
        const specialization = await this.specializationService.create(args);
        const specializationResponce = new SpecializationGraph({...specialization});
        return specializationResponce;
    }
}