import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateService } from '../model/createService.args';
import { Service } from '../model/service.interface';
import { ServiceSearch } from '../model/service.schema';

@Injectable()
export class ServiceService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        @Inject('SMARTSEARCH_CONNECTION') private client
        ) {}

    private get serviceCollection() {
        return this.database.collection('service');
    }

    private get searchCollection() {
        return this.client.collections('service').documents();
    }

    async findOne(service: Partial<Service>): Promise<Service> {
        const serviceResponce = await this.serviceCollection.findOne<Service>(service);
        return serviceResponce;
    }

    async create(args: CreateService) {
        const { description, name, price } = args;
        const service: Service = {
            name,
            description,
            price,
        };
        const insertService = await this.serviceCollection.insertOne(service);
        const searchService: ServiceSearch = {
            ...service,
            _id: service._id.toHexString()
        };
        await this.searchCollection.create(searchService);
        service._id = insertService.insertedId;
        return service;
    }
}
