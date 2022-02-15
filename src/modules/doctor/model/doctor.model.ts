import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Desease } from 'src/modules/deseases/model/desease.interface';
import { DeseaseGraph } from 'src/modules/deseases/model/desease.model';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { TimelineGraph } from 'src/modules/timeline/model/timeline.model';
import { Modify } from 'src/utils/modifyType';
import { AllowedDoctorLanguages } from './doctor.enum';
import { AcceptableAgeGroup, Doctor } from './doctor.interface';
import { ExperienceAndEducationGraph } from './parts/experience.model';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { Timeline } from 'src/modules/timeline/model/timeline.interface';

@ObjectType('Doctor')
export class DoctorGraph
    implements
        Modify<
            Omit<Doctor, 'passwordHASH' | 'numberOfRatings' | 'sumOfRatings'>,
            {
                _id: string;
                rating: number;
                experiences: ExperienceAndEducationGraph[];
            }
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

    @Field(() => [DeseaseGraph], { nullable: true })
    deseases?: DeseaseGraph[];

    @Field(() => GraphQLISODateTime)
    startingExperienceDate: Date;

    @Field({ nullable: true, defaultValue: 10 })
    rating: number;

    @Field({ nullable: true })
    description: string;

    @Field(() => Int, { defaultValue: 0 })
    numOfRatings: number;

    @Field(() => [TimelineGraph], { nullable: true })
    timelines: TimelineGraph[];

    @Field({ nullable: true })
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => PhotoURLGraph, { nullable: true })
    avatar: PhotoURLGraph;

    @Field(() => [SpecializationGraph], { nullable: true })
    specializations: SpecializationGraph[];

    @Field(() => [ExperienceAndEducationGraph], { nullable: true })
    experiences: ExperienceAndEducationGraph[];

    @Field(() => [AllowedDoctorLanguages])
    languages: AllowedDoctorLanguages[];

    constructor(
        doctor: Partial<
            Doctor & {
                deseases?: Desease[];
                specializations?: Specialization[];
                timelines?: Timeline[];
            }
        >,
    ) {
        if (doctor._id != null) this._id = doctor._id.toHexString();
        if (doctor.fullName != null) this.fullName = doctor.fullName;
        if (doctor.email != null) this.email = doctor.email;
        if (doctor.phoneNumber != null) this.phoneNumber = doctor.phoneNumber;
        if (doctor.deseases != null)
            this.deseases = doctor.deseases.map(
                (val) => new DeseaseGraph({ ...val }),
            );
        if (doctor.description != null) this.description = doctor.description;
        if (doctor.numberOfRatings != null)
            this.numOfRatings = doctor.numberOfRatings;
        if (doctor.sumOfRatings != null) {
            const { numberOfRatings, sumOfRatings } = doctor;
            const rating = sumOfRatings / numberOfRatings;
            this.rating = rating;
        }
        if (doctor.timelines != null)
            this.timelines = doctor.timelines.map(
                (val) => new TimelineGraph({ ...val }),
            );
        if (doctor.acceptableAgeGroup != null)
            this.acceptableAgeGroup = doctor.acceptableAgeGroup;
        if (doctor.avatar != null)
            this.avatar = new PhotoURLGraph({ ...doctor.avatar });
        if (doctor.specializations != null)
            this.specializations = doctor.specializations.map(
                (val) => new SpecializationGraph({ ...val }),
            );
        if (doctor.experiences != null)
            this.experiences = doctor.experiences.map(
                (val) => new ExperienceAndEducationGraph({ ...val }),
            );
        if (doctor.languages != null) this.languages = doctor.languages;
    }
}
