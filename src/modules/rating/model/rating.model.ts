import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { RatingAddictive } from './rating.addictive';
import { Rating } from './rating.interface';

@ObjectType()
export class RatingGraph
    implements
        Modify<
            Omit<Rating, 'userId' | 'doctorId'>,
            {
                _id: string;
                doctor?: DoctorGraph;
                user?: UserGraph;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field({ nullable: true })
    comment: string;

    @Field(() => Int, { nullable: false })
    rating: number;

    constructor(rating: Partial<RatingAddictive>) {
        if (rating._id) this._id = rating._id.toHexString();
        if (rating.comment) this.comment = rating.comment;
        if (rating.user) this.user = new UserGraph({ ...rating.user });
        if (rating.doctor) this.doctor = new DoctorGraph({ ...rating.doctor });
        if (rating.rating) this.rating = rating.rating;
    }
}
