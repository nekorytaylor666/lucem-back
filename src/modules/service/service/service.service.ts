import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { CreateService } from '../model/createService.args';
import { ServiceAddictive } from '../model/service.addictive';
import { Service } from '../model/service.interface';
import { ServiceSearch } from '../model/service.schema';

@Injectable()
export class ServiceService extends BasicService<Service> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        @Inject('SMARTSEARCH_CONNECTION') private client,
    ) {
        super();
        this.dbService = this.database.collection('service');
        this.basicLookups = [
            {
                from: 'doctor',
                let: {
                    doctorIds: 'doctorIds',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$_id', '$$doctorIds'],
                            },
                        },
                    },
                ],
                as: 'doctors',
                isArray: true,
            },
            {
                from: 'specialization',
                let: {
                    specializationIds: 'specializationIds',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$_id', '$$specializationIds'],
                            },
                        },
                    },
                ],
                as: 'specializations',
                isArray: true,
            },
        ];
    }

    private get searchCollection() {
        return this.client.collections('service').documents();
    }

    async findById(serviceId: ObjectId) {
        const service = await this.findWithAddictivesCursor<ServiceAddictive>({
            find: { _id: serviceId },
            lookups: this.basicLookups,
        }).toArray();
        return service[0];
    }

    async findByDoctorId(doctorId: ObjectId) {
        const services = await this.findWithAddictivesCursor<ServiceAddictive>({
            matchQuery: {
                doctorIds: { $elemMatch: { $eq: doctorId } },
            },
            lookups: this.basicLookups,
        }).toArray();
        return services;
    }

    async findByDoctorIdsCursor(doctorIds: ObjectId[]) {
        const services = this.findWithAddictivesCursor<ServiceAddictive>({
            matchQuery: {
                doctorIds: { $in: doctorIds },
            },
            lookups: this.basicLookups,
        });
        return services;
    }

    async findUnshownServices(userId: ObjectId) {
        const service = await this.dbService
            .aggregate<Service>([
                {
                    $match: {
                        showServices: { $exists: true },
                    },
                },
                {
                    $lookup: {
                        from: 'booking',
                        let: {
                            serviceId: '$_id',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: [
                                                    '$serviceId',
                                                    '$$serviceId',
                                                ],
                                            },
                                            { $eq: ['$userId', userId] },
                                        ],
                                    },
                                    progress: 'done',
                                },
                            },
                        ],
                        as: 'booking',
                    },
                },
            ])
            .toArray();
        const unshownServicesMatrix = await Promise.all(
            service.map(async (val) => {
                return await Promise.all(
                    val.showServices.map(async (val) => {
                        return await this.dbService.findOne({
                            _id: val,
                        });
                    }),
                );
            }),
        );
        const unshownServicesArray = [].concat(...unshownServicesMatrix);
        return unshownServicesArray;
    }

    async create(args: CreateService) {
        const {
            description,
            name,
            price,
            isShown,
            specializationIds: _specializationIds,
            doctorIds: _doctorIds,
        } = args;
        const specializationIds = _specializationIds.map(
            (val) => new ObjectId(val),
        );
        const doctorIds = _doctorIds.map((val) => new ObjectId(val));
        const service: Service = {
            name,
            description,
            price,
            isShown,
            specializationIds,
            doctorIds,
        };
        const insertService = await this.insertOne(service);
        const searchService: ServiceSearch = {
            ...service,
            _id: service._id.toHexString(),
        };
        await this.searchCollection.create(searchService);
        service._id = insertService;
        return service;
    }
}
