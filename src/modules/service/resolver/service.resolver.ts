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
import { ServiceAddictive } from '../model/service.addictive';
import { SpecializationService } from 'src/modules/specialization/service/specialization.service';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { EditService } from '../model/editService.args';

@Resolver()
export class ServiceResolver {
    constructor(
        private serviceService: ServiceService,
        private specService: SpecializationService,
        private doctorService: DoctorService,
    ) {}

    @Mutation(() => ServiceGraph)
    async createService(@Args() args: CreateService) {
        const spec = args.doctorIds
            ? undefined
            : await this.specService.findOne({
                  _id: new ObjectId(args.specializationId),
              });
        const insertService = await this.serviceService.create({
            ...args,
            doctorIds: spec
                ? spec.doctorIds
                : args.doctorIds.map((val) => new ObjectId(val)),
        });
        const serviceResponce = new ServiceGraph({ ...insertService });
        return serviceResponce;
    }

    @Query(() => ServiceGraph)
    async getServiceById(
        @Args('serviceId', { type: () => String }) serviceId: string,
    ) {
        const service = await this.serviceService.findById(
            new ObjectId(serviceId),
        );
        const serviceResponce = new ServiceGraph({ ...service });
        return serviceResponce;
    }

    @Query(() => [ServiceGraph])
    async getServicesByDoctorId(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const service = await this.serviceService.findByDoctorId(
            new ObjectId(doctorId),
        );
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
        const serviceCursor = await this.serviceService.findByDoctorIdsCursor(
            doctorIds,
        );
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
        const attachService = await this.serviceService.updateOneWithOptions({
            findField: ['_id'],
            findValue: [new ObjectId(serviceId)],
            updateField: ['doctorIds'],
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
        const services = await this.serviceService
            .findWithAddictivesCursor<ServiceAddictive>({
                matchQuery: {
                    doctorIds: { $elemMatch: { $eq: new ObjectId(doctorId) } },
                    isShown: { $exists: false },
                },
                lookups: this.serviceService.basicLookups,
            })
            .toArray();
        const servicesResponce = services.map(
            (val) => new ServiceGraph({ ...val }),
        );
        return servicesResponce;
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
        const service = await this.serviceService.updateOneWithOptions({
            findField: ['_id'],
            findValue: [new ObjectId(shownServiceId)],
            updateField: ['showServices'],
            updateValue: [new ObjectId(unShownServiceId)],
            method: '$addToSet',
        });
        const serviceResponce = new ServiceGraph({ ...service });
        return serviceResponce;
    }

    @Query(() => String)
    async attachAllDoctorsToServicesScript() {
        const specs = await this.specService.listWithAddictives();
        await Promise.all([
            specs.map(async (spec) => {
                await Promise.all([
                    spec.doctorIds.map(async (doctorId) => {
                        await this.serviceService.updateManyWithOptions({
                            findField: ['specializationId'],
                            findValue: [spec._id],
                            updateField: ['doctorIds'],
                            updateValue: [doctorId],
                            method: '$addToSet',
                        });
                    }),
                ]);
            }),
        ]);
    }

    @Mutation(() => ServiceGraph)
    async editService(@Args() args: EditService) {
        const service = await this.serviceService.edit(args);
        const serviceResponce = new ServiceGraph({ ...service });
        return serviceResponce;
    }

    @Mutation(() => Boolean)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async deleteService(
        @Args('serviceId', { type: () => String }) serviceId: string,
    ) {
        const doctorResponce = await this.doctorService.deleteOne({
            _id: new ObjectId(serviceId),
        });
        return doctorResponce;
    }
}
