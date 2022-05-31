import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';

export interface AppointmentResults {
    photoURL?: PhotoURL;
    description: string;
    doctorId: ObjectId;
}

@InputType()
export class CreateAppointmentResults {
    @Field()
    description: string;
    @Field(() => GraphQLUpload, { nullable: true })
    photoURL: Promise<FileUpload>;
}

@InputType()
export class EditAppointmentResultsInput {
    @Field({ nullable: true })
    description: string;
    @Field(() => GraphQLUpload, { nullable: true })
    photo: Promise<FileUpload>;
    @Field({ nullable: true })
    doctorId: string;
}

@ObjectType('AppointmentResults')
export class AppointmentResultsGraph
    implements
        Modify<
            AppointmentResults,
            {
                doctorId: string;
                photoURL: PhotoURLGraph;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => PhotoURLGraph, { nullable: true })
    photoURL: PhotoURLGraph;

    @Field()
    description: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field()
    doctorId: string;

    constructor(
        appointmentResults: Partial<AppointmentResults> & {
            doctor?: Doctor;
            user?: User;
        },
    ) {
        this._id = new ObjectId().toHexString();
        if (appointmentResults.description)
            this.description = appointmentResults.description;
        if (appointmentResults.photoURL)
            this.photoURL = new PhotoURLGraph({
                ...appointmentResults.photoURL,
            });
        if (appointmentResults.doctorId != null)
            this.doctorId = appointmentResults.doctorId.toHexString();
        if (appointmentResults.doctor)
            this.doctor = new DoctorGraph({ ...appointmentResults.doctor });
        if (appointmentResults.user)
            this.user = new UserGraph({ ...appointmentResults.user });
    }
}
