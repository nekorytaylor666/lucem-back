import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDeseaseInput } from '../model/desease.inputs';
import { Db } from 'mongodb';
import { Desease } from '../model/desease.interface';

@Injectable()
export class DeseaseService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db,
    ) {}

    get deseaseCollection() {
        return this.database.collection<Desease>('desease');
    }

    async create(desease: CreateDeseaseInput) {
        try {
            const insetDesease = await this.deseaseCollection.insertOne(
                desease,
            );
            const deseaseResponce: Desease = {
                ...desease,
                _id: insetDesease.insertedId,
            };
            return deseaseResponce;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async list() {
        //!TODO Add pagination for cursor
        return await this.deseaseCollection.find().toArray();
    }
}
