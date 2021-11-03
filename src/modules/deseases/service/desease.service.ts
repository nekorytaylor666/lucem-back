import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Modify } from 'src/utils/modifyType';
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

    async create(name: string) {
        try {
            const desease: Desease = {
                _id: new ObjectId(),
                name,
            };
            const insertDesease = await this.deseaseCollection.insertOne(
                desease,
            );
            const deseaseSearch: DeseaseSearch = {
                ...desease,
                _id: insertDesease.insertedId.toHexString(),
                num: 1,
            };

            await this.searchCollection.create(deseaseSearch);
            return desease;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    listCursor() {
        return this.deseaseCollection.find();
    }

    async findOne(args: Partial<Desease>) {
        const desease = await this.deseaseCollection.findOne(args);
        return desease;
    }

    async updateOne(args: {
        find: Partial<Desease>;
        update: Partial<Modify<Desease, { doctorIds: ObjectId }>>;
        method: '$set' | '$inc' | '$addToSet' | '$push';
        ignoreUndefined?: true;
    }) {
        const { find, update, method, ignoreUndefined } = args;
        const updateQuery = {
            [method]: update,
        };
        const desease = await this.deseaseCollection.findOneAndUpdate(
            find,
            updateQuery,
            {
                returnDocument: 'after',
                ignoreUndefined: ignoreUndefined ? ignoreUndefined : false,
            },
        );
        return desease.value;
    }

    async list() {
        return await this.deseaseCollection.find().toArray();
    }
}
