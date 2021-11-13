import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { AggregationCursor, Db, ObjectId } from 'mongodb';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { BasicService } from 'src/modules/helpers/basic.service';
import { CreateRating } from '../model/createRating.args';
import { RatingAddictive } from '../model/rating.addictive';
import { Rating } from '../model/rating.interface';

@Injectable()
export class RatingService extends BasicService<Rating> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private doctorService: DoctorService,
    ) {
        super();
        this.dbService = this.database.collection('rating');
        this.basicLookups = [
            {
                from: 'doctor',
                localField: 'doctorId',
                foreignField: '_id',
                as: 'doctor',
                isArray: false,
            },
            {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                isArray: false,
            },
        ];
    }

    findRatingsByDoctorId(doctorId: ObjectId) {
        const ratings = this.findWithAddictivesCursor<RatingAddictive>({
            find: { doctorId },
            lookups: this.basicLookups,
        });
        return ratings;
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
        const insertRating = await this.insertOne(rating);
        rating._id = insertRating;
        await this.doctorService.updateOneWithOptions({
            updateField: ['numberOfRatings', 'sumOfRatings'],
            updateValue: [1, numRating],
            findField: ['_id'],
            findValue: [doctorId],
            method: '$inc',
        });
        return rating;
    }
}
