import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppointmentResults } from '../../model/parts/AppointmenResults.model';

@Injectable()
export class AppointmenResultsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get appointmentResultsCollection() {
        return this.database.collection('appointmentResults');
    }

    async find(args: Partial<AppointmentResults>) {
        const appointmentResults = await this.appointmentResultsCollection
            .find(args)
            .toArray();
        return appointmentResults;
    }
}
