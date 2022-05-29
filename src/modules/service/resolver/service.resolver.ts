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
import { SpecializationAddictive } from 'src/modules/specialization/model/specialization.addictive';
import { Service } from '../model/service.interface';

@Resolver()
export class ServiceResolver {
    constructor(
        private serviceService: ServiceService,
        private specService: SpecializationService,
        private doctorService: DoctorService,
    ) {}

    @Mutation(() => ServiceGraph)
    async createService(@Args() args: CreateService) {
        const specs =
            !args.doctorIds && args.specializationIds
                ? await this.specService.findWithOptions({
                      fields: ['_id'],
                      values: [
                          {
                              $in: args.specializationIds.map(
                                  (val) => new ObjectId(val),
                              ),
                          },
                      ],
                  })
                : undefined;
        const specDoctorIds = specs && specs.flatMap((val) => val.doctorIds);
        const insertService = await this.serviceService.create({
            ...args,
            doctorIds:
                specDoctorIds && !args.doctorIds
                    ? specDoctorIds
                    : !specDoctorIds && args.doctorIds
                    ? args.doctorIds.map((val) => new ObjectId(val))
                    : undefined,
        });
        const serviceResponce = new ServiceGraph({ ...insertService });
        return serviceResponce;
    }

    @Query(() => ServiceGraph)
    async getServiceById(
        @Args('serviceId', { type: () => String }) serviceId: string,
    ) {
        const service = await this.serviceService
            .findWithAddictivesCursor<Service & ServiceAddictive>({
                find: {
                    _id: new ObjectId(serviceId),
                },
                lookups: this.serviceService.basicLookups,
            })
            .toArray();
        const serviceResponce = new ServiceGraph({ ...service[0] });
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
        const specs = await this.specService
            .findWithAddictivesCursor<SpecializationAddictive>({
                lookups: this.specService.basicLookups,
            })
            .toArray();
        await Promise.all([
            specs.map(async (spec) => {
                await Promise.all([
                    spec.doctorIds.map(async (doctorId) => {
                        await this.serviceService.updateManyWithOptions({
                            findField: ['specializationIds'],
                            findValue: [{ $in: spec._id }],
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

    @Mutation(() => Boolean)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async deleteServices(
        @Args('serviceIds', { type: () => [String] }) serviceIds: string[],
    ) {
        const doctor = await this.doctorService.deleteManyWithOptions({
            fields: ['_id'],
            values: [{ $in: serviceIds.map((val) => new ObjectId(val)) }],
        });
        return doctor;
    }

    @Query(() => [ServiceGraph])
    async getServicesBySpecializationId(
        @Args('specializationId', { type: () => String })
        specializationId: string,
        @Args('page', { type: () => Int }) page: number,
    ): Promise<ServiceGraph[]> {
        const servicesCursor = await this.serviceService.findWithOptionsCursor({
            fields: ['specializationIds'],
            values: [{ $elemMatch: { $eq: new ObjectId(specializationId) } }],
        });
        const services = await paginate({
            cursor: servicesCursor,
            page,
            elementsPerPage: 10,
        });
        const servicesResponce = services.map(
            (val) => new ServiceGraph({ ...val }),
        );
        return servicesResponce;
    }

    @Query(() => ServiceGraph, { nullable: true })
    async getPrimaryServiceOfDoctor(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const service = await this.serviceService.findOneWithOptions({
            fields: ['doctorIds', 'isPrimary'],
            values: [{ $elemMatch: { $eq: new ObjectId(doctorId) } }, true],
        });
        const serviceResponce = new ServiceGraph({ ...service });
        return serviceResponce;
    }
}
