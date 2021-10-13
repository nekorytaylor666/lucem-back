import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { CurrentRequestURLGraph, PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { SpecializationDoctorService } from 'src/modules/specializationDoctor/service/specializationDoctor.service';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { SpecializationGraph } from '../model/specialization.model';
import { SpecializationService } from '../service/specialization.service';

@Resolver()
export class SpecializationResolver {
    constructor(
        private specializationService: SpecializationService,
        private specializationDoctorService: SpecializationDoctorService,
    ) {}

    @Mutation(() => SpecializationGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async createSpecialization(@Args() args: CreateSpecialization, @CurrentRequestURLGraph() req: string) {
        const specialization = await this.specializationService.create(args, req);
        const specializationResponce = new SpecializationGraph({
            ...specialization,
        });
        return specializationResponce;
    }

    @Mutation(() => String)
    async attachDoctorToSpecialization(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('specializationId', { type: () => String })
        specializationId: string,
    ) {
        const createAttachment = await this.specializationDoctorService.create({ doctorId, specializationId });
        return 'success';
    }

    @Query(() => SpecializationGraph)
    async findSpecializationWithDoctors(
        @Args('specializationId', { type: () => String}) specializationId: string
    ) {
        const specialization = await this.specializationService.findOneWithAddictives(specializationId);
        const specializationResponce = new SpecializationGraph({...specialization});
        return specializationResponce
    }

    @Query(() => [SpecializationGraph])
    async getSpecialization() {
        const specialization = await this.specializationService.listWithAddictives();
        const specializationResponce = specialization.map((val) => new SpecializationGraph({...val}));
        return specializationResponce;
    }
}
