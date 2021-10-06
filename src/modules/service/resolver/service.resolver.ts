import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { CreateService } from '../model/createService.args';
import { ServiceGraph } from '../model/service.model';
import { ServiceService } from '../service/service.service';

@Resolver()
export class ServiceResolver {
    constructor(private serviceService: ServiceService) {}

    @Mutation(() => ServiceGraph)
    async createService(@Args() args: CreateService) {
        const insertService = await this.serviceService.create(args);
        const serviceResponce = new ServiceGraph({ ...insertService });
        return serviceResponce;
    }

    @Query(() => [ServiceGraph])
    async getServicesByDoctorId(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const service = await this.serviceService.findWithOptions({
            fields: ['doctorId'],
            values: [{ $elemMatch: { $eq: new ObjectId(doctorId) } }],
        });
        const serviceResponce = service.map(
            (val) => new ServiceGraph({ ...val }),
        );
        return serviceResponce;
    }

    @Mutation(() => ServiceGraph)
    async attachServiceToDoctor(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('serviceId', { type: () => String }) serviceId: string,
    ) {
        const attachService = await this.serviceService.updateOne({
            findField: ['_id'],
            findValue: [new ObjectId(serviceId)],
            updateField: ['doctorId'],
            updateValue: [new ObjectId(doctorId)],
            method: '$addToSet',
        });
        const serviceResponce = new ServiceGraph({ ...attachService });
        return serviceResponce;
    }

    @Query(() => [ServiceGraph])
    async getShownForMainByDoctorIdServices(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const service = await this.serviceService.findWithOptions({
            fields: ['doctorId', 'isShown'],
            values: [
                { $elemMatch: new ObjectId(doctorId) },
                { $exists: false },
            ],
        });
        const serviceResponce = service.map(
            (val) => new ServiceGraph({ ...val }),
        );
        return serviceResponce;
    }
}
