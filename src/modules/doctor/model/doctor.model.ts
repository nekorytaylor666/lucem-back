import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Desease } from 'src/modules/deseases/model/desease.interface';
import { DeseaseGraph } from 'src/modules/deseases/model/desease.model';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { Modify } from 'src/utils/modifyType';
import { AcceptableAgeGroup, Doctor } from './doctor.interface';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { ExperienceAndEducationGraph } from './utils/experience/experience.model';
import { WorkTimeGraph } from './utils/workTime/workTime.model';
import { LanguageGraph } from './utils/language/language.model';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { Booking } from 'src/modules/booking/model/booking.interface';
import { Min, Max } from 'class-validator';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { Service } from 'src/modules/service/model/service.interface';

@ObjectType('Doctor')
export class DoctorGraph
    implements
        Modify<
            Omit<Doctor, 'passwordHASH' | 'numberOfRatings' | 'sumOfRatings'>,
            {
                _id: string;
                rating: number;
                experiences: ExperienceAndEducationGraph[];
                workTimes: WorkTimeGraph[];
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

    @Field(() => GraphQLISODateTime, { nullable: true })
    startingExperienceDate: Date;

    @Field({ nullable: true, defaultValue: 10 })
    rating: number;

    @Field({ nullable: true })
    description: string;

    @Field(() => Int, { defaultValue: 0 })
    numOfRatings: number;

    @Field({ nullable: true })
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => PhotoURLGraph, { nullable: true })
    avatar: PhotoURLGraph;

    @Field(() => [SpecializationGraph], { nullable: true })
    specializations: SpecializationGraph[];

    @Field(() => [ExperienceAndEducationGraph], { nullable: true })
    experiences: ExperienceAndEducationGraph[];

    @Field(() => [LanguageGraph])
    languages: LanguageGraph[];

    @Field(() => [WorkTimeGraph], { nullable: true })
    workTimes: WorkTimeGraph[];

    @Field({ nullable: true })
    cabinet: string;

    @Field(() => Boolean, { nullable: true })
    isDeleted?: true;

    @Field(() => [BookingGraph], { nullable: true })
    upcomingBookings: BookingGraph[];

    @Field(() => ServiceGraph, { nullable: true })
    defaultService: ServiceGraph;
    @Min(0)
    @Max(100)
    @Field({
        // nullable: true,
        defaultValue: 50,
    })
    doctorPercentage: number;

    constructor(
        doctor: Partial<
            Doctor & {
                service: Service;
                deseases?: Desease[];
                specializations?: Specialization[];
                upcomingBookings?: Booking[];
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
        if (doctor.languages != null)
            this.languages = doctor.languages.map(
                (val) => new LanguageGraph({ ...val }),
            );
        if (doctor.workTimes != null)
            this.workTimes = doctor.workTimes.map(
                (val) => new WorkTimeGraph({ ...val }),
            );
        if (doctor.cabinet != null) this.cabinet = doctor.cabinet;
        if (doctor.isDeleted != null) this.isDeleted = doctor.isDeleted;
        if (doctor.upcomingBookings != null)
            this.upcomingBookings = doctor.upcomingBookings.map(
                (val) => new BookingGraph({ ...val }),
            );
        if (doctor.doctorPercentage != null)
            this.doctorPercentage = doctor.doctorPercentage;
        if (doctor.service != null)
            this.defaultService = new ServiceGraph({ ...doctor.service });
        if (doctor.startingExperienceDate != null)
            this.startingExperienceDate = doctor.startingExperienceDate;
    }
}
