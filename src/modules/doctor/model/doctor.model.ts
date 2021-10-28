import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DeseaseGraph } from 'src/modules/deseases/model/desease.graph';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { TimelineGraph } from 'src/modules/timeline/model/timeline.model';
import { Modify } from 'src/utils/modifyType';
import { DoctorAddictives } from './doctor.addictives';
import { AcceptableAgeGroup, Doctor } from './doctor.interface';

@ObjectType('Doctor')
export class DoctorGraph
    implements
        Modify<
            Omit<Doctor, 'passwordHASH' | 'numberOfRatings' | 'sumOfRatings'>,
            { _id: string; rating: number }
        >
{
    @Field()
    _id: string;

    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field({ nullable: true })
    token?: string;

    @Field(() => Date)
    dateOfBirth: Date;

    @Field(() => [DeseaseGraph], { nullable: true })
    deseases?: DeseaseGraph[];

    @Field(() => Int)
    yearsOfExperience: number;

    @Field({ nullable: true, defaultValue: 10 })
    rating: number;

    @Field()
    description: string;

    @Field(() => Int, { defaultValue: 0 })
    numOfRatings: number;

    @Field(() => [TimelineGraph], { nullable: true })
    timelines: TimelineGraph[];

    @Field()
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => PhotoURLGraph, { nullable: true })
    avatar: PhotoURLGraph;

    @Field(() => [SpecializationGraph], { nullable: true })
    specializations: SpecializationGraph[];

    constructor(doctor: Partial<DoctorAddictives>) {
        if (doctor._id) this._id = doctor._id.toHexString();
        if (doctor.fullName) this.fullName = doctor.fullName;
        if (doctor.email) this.email = doctor.email;
        if (doctor.phoneNumber) this.phoneNumber = doctor.phoneNumber;
        if (doctor.token) this.token = doctor.token;
        if (doctor.dateOfBirth) this.dateOfBirth = doctor.dateOfBirth;
        if (doctor.deseases)
            this.deseases = doctor.deseases.map(
                (val) => new DeseaseGraph({ ...val }),
            );
        if (doctor.description) this.description = doctor.description;
        if (doctor.numberOfRatings) this.numOfRatings = doctor.numberOfRatings;
        if (doctor.sumOfRatings) {
            const { numberOfRatings, sumOfRatings } = doctor;
            const rating = sumOfRatings / numberOfRatings;
            this.rating = rating;
        }
        if (doctor.timeline)
            this.timelines = doctor.timeline.map(
                (val) => new TimelineGraph({ ...val }),
            );
        if (doctor.acceptableAgeGroup)
            this.acceptableAgeGroup = doctor.acceptableAgeGroup;
        if (doctor.avatar)
            this.avatar = new PhotoURLGraph({ ...doctor.avatar });
        if (doctor.specializations)
            this.specializations = doctor.specializations.map(
                (val) => new SpecializationGraph({ ...val }),
            );
    }
}
