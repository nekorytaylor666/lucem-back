import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateService } from '../model/createService.args';
import { Service } from '../model/service.interface';

@Injectable()
export class ServiceService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get serviceCollection() {
        return this.database.collection('service');
    }

    async create(args: CreateService) {
        const { description, name, price } = args;
        const service: Service = {
            name,
            description,
            price,
        };
        const insertService = await this.serviceCollection.insertOne(service);
        service._id = insertService.insertedId;
        return service;
    }
}
