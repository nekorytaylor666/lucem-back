import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeseaseGraph } from '../model/desease.model';
import { DeseaseService } from '../service/desease.service';
import { paginate } from 'src/utils/paginate';
import { ObjectId } from 'mongodb';

@Resolver(() => DeseaseGraph)
export class DeseaseResolver {
    constructor(private deseaseSerivce: DeseaseService) {}

    @Mutation(() => DeseaseGraph)
    async createDesease(@Args('name', { type: () => String }) name: string) {
        const createDesease = await this.deseaseSerivce.create(name);
        const deseaseResponce = new DeseaseGraph({ ...createDesease });
        return deseaseResponce;
    }

    @Mutation(() => DeseaseGraph)
    async attachDoctorToDesease(
        @Args('doctorId', { type: () => String }) _doctorId: string,
        @Args('deseaseId', { type: () => String }) _deseaseId: string,
    ) {
        const [doctorId, deseaseId] = [
            new ObjectId(_doctorId),
            new ObjectId(_deseaseId),
        ];
        const desease = await this.deseaseSerivce.updateOne({
            find: { _id: deseaseId },
            update: { doctorIds: doctorId },
            method: '$addToSet',
            ignoreUndefined: true,
        });
        const deseaseResponce = new DeseaseGraph({ ...desease });
        return deseaseResponce;
    }

    @Query(() => [DeseaseGraph])
    async getDesease(@Args('page', { type: () => Int }) page: number) {
        const deseasesCursor = this.deseaseSerivce.listCursor();
        const deseases = await paginate({
            cursor: deseasesCursor,
            page,
            elementsPerPage: 10,
        });
        const deseasesResponce = deseases.map(
            (val) => new DeseaseGraph({ ...val }),
        );
        return deseasesResponce;
    }
}
