import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { EditSpecialization } from '../model/editSpecialization.args';
import { SpecializationAddictive } from '../model/specialization.addictive';
import { SpecializationGraph } from '../model/specialization.model';
import { SpecializationService } from '../service/specialization.service';

@Resolver()
export class SpecializationResolver {
    constructor(private specializationService: SpecializationService) {}

    @Mutation(() => SpecializationGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async createSpecialization(
        @Args() args: CreateSpecialization,
        @CurrentRequestURLGraph() req: string,
    ) {
        const specialization = await this.specializationService.create(
            args,
            req,
        );
        const specializationResponce = new SpecializationGraph({
            ...specialization,
        });
        return specializationResponce;
    }

    @Mutation(() => SpecializationGraph)
    async attachDoctorToSpecialization(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('specializationId', { type: () => String })
        specializationId: string,
    ) {
        const specialization =
            await this.specializationService.updateOneWithOptions({
                findField: ['_id'],
                findValue: [new ObjectId(specializationId)],
                updateField: ['doctorIds'],
                updateValue: [new ObjectId(doctorId)],
                method: '$addToSet',
            });
        const specializationResponce = new SpecializationGraph({
            ...specialization,
        });
        return specializationResponce;
    }

    @Query(() => SpecializationGraph)
    async findSpecialization(
        @Args('specializationId', { type: () => String })
        specializationId: string,
    ) {
        const specialization =
            await this.specializationService.findByIdWithAddictives(
                new ObjectId(specializationId),
            );
        const specializationResponce = new SpecializationGraph({
            ...specialization,
        });
        return specializationResponce;
    }

    @Query(() => [SpecializationGraph])
    async getSpecializations() {
        const specialization = await this.specializationService
            .findWithAddictivesCursor<SpecializationAddictive>({
                lookups: this.specializationService.basicLookups,
            })
            .toArray();
        const specializationResponce = specialization.map(
            (val) => new SpecializationGraph({ ...val }),
        );
        return specializationResponce;
    }

    @Mutation(() => SpecializationGraph)
    async editSpecializationWithoutFile(
        @Args() args: EditSpecialization,
    ): Promise<SpecializationGraph> {
        const specialization =
            await this.specializationService.editSpecializationWithoutFiles(
                args,
            );
        const specializationResponce = new SpecializationGraph({
            ...specialization,
        });
        return specializationResponce;
    }

    @Mutation(() => SpecializationGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async editSpecializationWithFile(
        @Args('image', { type: () => GraphQLUpload, name: 'image' })
        image: Promise<FileUpload>,
        @Args('specializationId', { type: () => String })
        specializationId: string,
        @CurrentRequestURLGraph() req: string,
    ): Promise<SpecializationGraph> {
        const specialization = await this.specializationService.editWithFile({
            image: await image,
            specializationId,
            req,
        });
        const specializationResponce = new SpecializationGraph({
            ...specialization,
        });
        return specializationResponce;
    }
}
