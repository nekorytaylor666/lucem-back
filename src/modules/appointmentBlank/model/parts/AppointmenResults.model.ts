import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { AppointmentBlank } from '../appointmentBlank.model';

export interface AppointmentResults
    extends Omit<AppointmentBlank, 'sessionId'> {
    _id: ObjectId;
    photoURL?: PhotoURL;
    description: string;
}

@InputType()
export class CreateAppointmentResults {
    @Field()
    description: string;
    @Field(() => GraphQLUpload, { nullable: true })
    photoURL: Promise<FileUpload>;
}

@ObjectType('AppointmentResults')
export class AppointmentResultsGraph
    implements
        Modify<
            Omit<AppointmentResults, 'doctorId' | 'userId' | 'sessionId'>,
            {
                _id: string;
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

    constructor(
        appointmentResults: Partial<AppointmentResults> & {
            doctor?: Doctor;
            user?: User;
        },
    ) {
        if (appointmentResults._id)
            this._id = appointmentResults._id.toHexString();
        if (appointmentResults.description)
            this.description = appointmentResults.description;
        if (appointmentResults.photoURL)
            this.photoURL = new PhotoURLGraph({
                ...appointmentResults.photoURL,
            });
        if (appointmentResults.doctor)
            this.doctor = new DoctorGraph({ ...appointmentResults.doctor });
        if (appointmentResults.user)
            this.user = new UserGraph({ ...appointmentResults.user });
    }
}
