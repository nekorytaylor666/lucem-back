import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class DestinationService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get destinationCollection() {
        return this.database.collection('destination');
    }

    // async create(args: {
    //     serviceId: ObjectId;
    //     userId: ObjectId;
    //     sessionId: ObjectId;
    // }) {
    //     const { serviceId, userId, sessionId } = args;
    //     const destination: Destination = {
    //         _id: new ObjectId(),
    //         sessionId,
    //     };
    // }
}
