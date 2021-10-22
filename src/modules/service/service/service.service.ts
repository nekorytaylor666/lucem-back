import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateService } from '../model/createService.args';
import { ServiceAddictive } from '../model/service.addictive';
import { Service } from '../model/service.interface';
import { ServiceSearch } from '../model/service.schema';

@Injectable()
export class ServiceService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        @Inject('SMARTSEARCH_CONNECTION') private client,
    ) {}

    private get serviceCollection() {
        return this.database.collection<Service>('service');
    }

    private get searchCollection() {
        return this.client.collections('service').documents();
    }

    async findOne(service: Partial<Service>): Promise<Service> {
        const serviceResponce = await this.serviceCollection.findOne<Service>(
            service,
        );
        return serviceResponce;
    }

    async list() {
        return this.serviceCollection.find().toArray();
    }

    async updateOne(args: {
        findField: (keyof Service)[];
        findValue: any[];
        updateField: (keyof Service)[];
        updateValue: any[];
        method: '$set' | '$inc' | '$addToSet' | '$push' | '$pull';
    }) {
        const { findField, findValue, updateField, updateValue, method } = args;
        const findQuery: any = {};
        findField.map((val, ind) => (findQuery[val] = findValue[ind]));
        const updateFieldsValues: any = {};
        updateField.map(
            (val, ind) => (updateFieldsValues[val] = updateValue[ind]),
        );
        const updateQuery = {
            [method]: updateFieldsValues,
        };
        const updateService = await this.serviceCollection.findOneAndUpdate(
            findQuery,
            updateQuery,
            { returnDocument: 'after' },
        );
        return updateService.value as Service;
    }

    async findOneWithOptions(args: {
        fields: (keyof Service)[];
        values: any[];
    }) {
        const { fields, values } = args;
        const findQuery: any = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const service = await this.serviceCollection.findOne<Service>(
            findQuery,
        );
        return service;
    }

    async findWithAddictivesCursor(args: {
        fields: (keyof Service)[];
        values: any[];
    }) {
        const { fields, values } = args;
        const findQuery: any = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const cursor = this.serviceCollection.aggregate<ServiceAddictive>([
            {
                $match: findQuery,
            },
            {
                $lookup: {
                    from: 'doctor',
                    let: {
                        doctorId: '$doctorId',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$doctorId']
                                },
                            },
                        },
                    ],
                    as: 'doctors'
                },
            },
        ]);
        return cursor;
    }

    async findUnshownServices(userId: ObjectId) {
        const service = await this.serviceCollection
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
                        return await this.serviceCollection.findOne({
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
        const { description, name, price, isShown } = args;
        const service: Service = {
            name,
            description,
            price,
            isShown,
        };
        const insertService = await this.serviceCollection.insertOne(service);
        const searchService: ServiceSearch = {
            ...service,
            _id: service._id.toHexString(),
        };
        await this.searchCollection.create(searchService);
        service._id = insertService.insertedId;
        return service;
    }

    async findWithOptions(args: { fields: (keyof Service)[]; values: any[] }) {
        const { fields, values } = args;
        const findQuery: { [index: string]: any } = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const services = await this.serviceCollection.find(findQuery).toArray();
        return services;
    }
}
