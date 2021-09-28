import { Inject, Injectable } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { Session } from "../model/session.interface";


@Injectable()
export class SessionService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db
    ) {}

    private get sessionCollection() {
        return this.database.collection('session');
    }

    async create(bookingId: string): Promise<Session> {
        const currentDate = new Date();
        const session: Session = {
            bookingId: new ObjectId(bookingId),
            startDate: currentDate,
        };
        const insertSession = await this.sessionCollection.insertOne(session);
        session._id = insertSession.insertedId;
        return session;
    }
}