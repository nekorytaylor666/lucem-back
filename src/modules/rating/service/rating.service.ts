import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { CreateRating } from '../model/createRating.args';
import { Rating } from '../model/rating.interface';

@Injectable()
export class RatingService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private doctorService: DoctorService,
    ) {}

    private get ratingCollection() {
        return this.database.collection('rating');
    }

    async create(
        newRating: CreateRating & { userId: ObjectId },
    ): Promise<Rating> {
        const {
            doctorId: _doctorId,
            userId,
            comment,
            rating: numRating,
        } = newRating;
        if (numRating > 10) throw new ApolloError('maximum rating is 10');
        const doctorId = new ObjectId(_doctorId);
        const rating: Rating = {
            doctorId,
            userId,
            comment,
            rating: numRating,
        };
        const insertRating = await this.ratingCollection.insertOne(rating);
        rating._id = insertRating.insertedId;
        await this.doctorService.update({
            updateField: ['numberOfRatings', 'sumOfRatings'],
            updateValue: [1, numRating],
            findField: ['_id'],
            findValue: [doctorId],
            method: '$inc',
        });
        return rating;
    }
}
