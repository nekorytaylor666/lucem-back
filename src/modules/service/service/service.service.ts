import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { Modify } from 'src/utils/modifyType';
import { CreateService } from '../model/createService.args';
import { EditService } from '../model/editService.args';
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
                                _id: {
                                    $in: ['$_id', '$$specializationIds'],
                                },
                            },
                        },
                    },
                ],
                as: 'specializations',
                isArray: false,
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

    async create(
        args: Modify<
            CreateService,
            {
                doctorIds: ObjectId[];
            }
        >,
    ) {
        const {
            description,
            name,
            price,
            isShown,
            specializationIds,
            doctorIds,
            durationInMinutes,
        } = args;
        const service: Service = {
            _id: new ObjectId(),
            name,
            description,
            price,
            isShown,
            specializationIds: specializationIds.map(
                (val) => new ObjectId(val),
            ),
            doctorIds,
            durationInMinutes,
        };
        await this.insertOne(service);
        const searchService: ServiceSearch = {
            ...service,
            _id: service._id.toHexString(),
        };
        await this.searchCollection.create(searchService);
        return service;
    }

    async edit(args: EditService): Promise<Service> {
        const {
            specializationId,
            doctorIds: _doctorIds,
            serviceId: _serviceId,
        } = args;
        delete args['serviceId'];

        const doctorIds =
            _doctorIds && _doctorIds.map((val) => new ObjectId(val));
        const service: Omit<Partial<Service>, '_id'> = {
            ...args,
            specializationIds: specializationId.map((val) => new ObjectId(val)),
            doctorIds,
        };
        removeUndefinedFromObject(service);
        const serviceResponce = await this.updateOne({
            find: { _id: new ObjectId(_serviceId) },
            update: service,
            method: '$set',
        });
        return serviceResponce;
    }
}
