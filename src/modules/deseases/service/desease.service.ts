import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDeseaseInput } from '../model/desease.inputs';
import { Db } from 'mongodb';
import { Desease } from '../model/desease.interface';
import { DeseaseSearch } from '../model/desease.shema';

@Injectable()
export class DeseaseService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db,
        @Inject('SMARTSEARCH_CONNECTION') private searchClient,
    ) {}

    private get deseaseCollection() {
        return this.database.collection<Desease>('desease');
    }

    private get searchCollection() {
        return this.searchClient.collections('desease').documents();
    }

    async create(desease: CreateDeseaseInput) {
        try {
            const insertDesease = await this.deseaseCollection.insertOne(
                desease,
            );
            const deseaseSearch: DeseaseSearch = {
                ...desease,
                _id: insertDesease.insertedId.toHexString(),
                num: 1,
            };

            await this.searchCollection.create(deseaseSearch);

            const deseaseResponce: Desease = {
                ...desease,
                _id: insertDesease.insertedId,
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

    async findOne(args: Partial<Desease>) {
        const desease = await this.deseaseCollection.findOne(args);
        return desease;
    }
}
