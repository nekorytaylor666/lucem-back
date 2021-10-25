import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { CreateService } from '../model/createService.args';
import { ServiceGraph } from '../model/service.model';
import { ServiceService } from '../service/service.service';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { UseGuards } from '@nestjs/common';
import {
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { User } from 'src/modules/user/model/user.interface';
import { paginate } from 'src/utils/paginate';
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

    @Query(() => [ServiceGraph])
    async getServicesByDoctorIds(
        @Args('doctorId', { type: () => [String] }) _doctorIds: string[],
        @Args('page', { type: () => Int }) page: number,
    ) {
        const doctorIds = _doctorIds.map((val) => new ObjectId(val));
        const serviceCursor =
            await this.serviceService.findWithAddictivesCursor({
                fields: ['doctorId'],
                values: [{ $in: doctorIds }],
            });
        const service = await paginate({
            cursor: serviceCursor,
            page,
            elementsPerPage: 10,
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

    @Query(() => [ServiceGraph])
    @Roles('user')
    @UseGuards(PreAuthGuard)
    async getUnshownServicesForPatient(@CurrentUserGraph() user: User) {
        const services = await this.serviceService.findUnshownServices(
            user._id,
        );
        const servicesResponce = services.map(
            (val) => new ServiceGraph({ ...val }),
        );
        return servicesResponce;
    }

    @Mutation(() => ServiceGraph)
    async attachUnshownServiceToShownService(
        @Args('unShownServiceId', { type: () => String })
        unShownServiceId: string,
        @Args('shownServiceId', { type: () => String }) shownServiceId: string,
    ) {
        const service = await this.serviceService.updateOne({
            findField: ['_id'],
            findValue: [new ObjectId(shownServiceId)],
            updateField: ['showServices'],
            updateValue: [new ObjectId(unShownServiceId)],
            method: '$addToSet',
        });
        const serviceResponce = new ServiceGraph({ ...service });
        return serviceResponce;
    }
}
