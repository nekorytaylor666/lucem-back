import { AggregationCursor, Collection, FindCursor, ObjectId } from 'mongodb';

export abstract class BasicService<T extends any = Record<string, unknown>> {
    protected dbService: Collection<T>;
    protected basicLookups: {
        from: string;
        localField?: string;
        foreignField?: string;
        let?: {
            [index: string]: keyof T;
        };
        pipeline?: any[];
        as: string;
        isArray: boolean;
    }[];
    async findOne(args: Partial<T>) {
        const document = await this.dbService.findOne<T>(args);
        return document;
    }

    async find(args: Partial<T>) {
        const documents = await this.dbService.find<T>(args).toArray();
        return documents;
    }

    async findOneWithOptions(args: { fields: (keyof T)[]; values: any[] }) {
        const { fields, values } = args;
        const query: any = {};
        fields.map((val, ind) => (query[val] = values[ind]));
        const document = await this.dbService.findOne<T>(query as T);
        return document;
    }

    async findWithOptions(args: { fields: (keyof T)[]; values: any[] }) {
        const { fields, values } = args;
        const query: any = {};
        fields.map((val, ind) => (query[val] = values[ind]));
        const documents = await this.dbService.find<T>(query as T).toArray();
        return documents;
    }

    async updateOne(args: {
        find: Partial<T>;
        update: Partial<T>;
        method: '$set' | '$inc' | '$push' | '$addToSet' | '$pull' | '$unset';
        ignoreUndefined?: true;
    }) {
        const { find, update, method, ignoreUndefined } = args;
        const updateQuery = {
            [method]: update,
        };
        const document = await this.dbService.findOneAndUpdate(
            find,
            updateQuery,
            {
                returnDocument: 'after',
                ignoreUndefined: ignoreUndefined ? ignoreUndefined : false,
            },
        );
        return document.value as T;
    }

    async updateOneWithOptions(args: {
        findField: (keyof T)[];
        findValue: any[];
        updateField: (keyof T)[];
        updateValue: any[];
        method: '$set' | '$inc' | '$push' | '$addToSet' | '$pull' | '$unset';
        ignoreUndefined?: true;
    }) {
        const {
            findField,
            findValue,
            updateField,
            updateValue,
            method,
            ignoreUndefined,
        } = args;
        const findQuery: any = {};
        findField.map((val, ind) => (findQuery[val] = findValue[ind]));
        const updateFieldsValues: any = {};
        updateField.map(
            (val, ind) => (updateFieldsValues[val] = updateValue[ind]),
        );
        const updateQuery = {
            [method]: updateFieldsValues,
        };
        const document = await this.dbService.findOneAndUpdate(
            findQuery,
            updateQuery,
            {
                returnDocument: 'after',
                ignoreUndefined: ignoreUndefined ? ignoreUndefined : false,
            },
        );
        return document.value;
    }

    async updateManyWithOptions(args: {
        findField: (keyof T)[];
        findValue: any[];
        updateField: (keyof T)[];
        updateValue: any[];
        method: '$set' | '$inc' | '$push' | '$addToSet' | '$pull' | '$unset';
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
        await this.dbService.updateMany(findQuery, updateQuery);
    }

    async insertOne(args: T): Promise<ObjectId> {
        const document = await this.dbService.insertOne(args as any);
        return document.insertedId;
    }

    findCursor(args: Partial<T>): FindCursor<T> {
        const cursor = this.dbService.find<T>(args);
        return cursor;
    }

    findWithAddictivesCursor<U>(args: {
        find?: Partial<T>;
        matchQuery?: Partial<{ [Property in keyof T]: any }>;
        sort?: Partial<{ [Property in keyof T]: number }>;
        lookups: {
            from: string;
            localField?: string;
            foreignField?: string;
            let?: {
                [index: string]: keyof T;
            };
            pipeline?: any[];
            as: string;
            isArray: boolean;
        }[];
    }): AggregationCursor<U> {
        const { find, sort, lookups: _lookups, matchQuery } = args;
        const notArrayLookups = _lookups.filter((val) => val.isArray === false);
        const lookups = _lookups.map((val) => {
            const lookupQuery = val.let
                ? {
                      $lookup: {
                          from: val.from,
                          let: {
                              [Object.keys(val.let)[0]]: `$${
                                  val.let[Object.keys(val.let)[0]]
                              }`,
                          },
                          pipeline: val.pipeline,
                          as: val.as,
                      },
                  }
                : {
                      $lookup: {
                          from: val.from,
                          localField: val.localField,
                          foreignField: val.foreignField,
                          as: val.as,
                      },
                  };
            return lookupQuery;
        });
        const addFields: { [index: string]: { $first: string } } = {};
        notArrayLookups.map((val) => {
            addFields[val.as] = {
                $first: `$${val.as}`,
            };
        });
        const aggregationUnfiltered = [
            { $match: find ? find : matchQuery },
            ...lookups,
            { $addFields: addFields },
            sort && { $sort: sort },
        ];
        const aggregation = aggregationUnfiltered.filter(
            (val) => val !== undefined,
        );
        console.dir((aggregation[1] as any).$lookup);
        const cursor = this.dbService.aggregate<U>(aggregation);
        return cursor;
    }

    async getMaxPages(args: {
        elementsPerPage: number;
        maxNumOfElements: number;
        find?: Partial<{ [Property in keyof T]: any }>;
    }) {
        const { find, elementsPerPage, maxNumOfElements } = args;
        const documents = await this.dbService.countDocuments(find, {
            limit: maxNumOfElements,
        });
        const pages = Math.round(documents / elementsPerPage);
        return pages;
    }

    async list() {
        return this.dbService.find().toArray();
    }
}
