import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { Modify } from 'src/utils/modifyType';

export interface AppointmentResults {
    _id: ObjectId;
    photoURL?: PhotoURL;
    description: string;
    doctorId: ObjectId;
}

@InputType()
export class CreateAppointmentResults {
    @Field()
    description: string;
}

@ObjectType('AppointmentResults')
export class AppointmentResultsGraph
    implements
        Modify<
            Omit<AppointmentResults, 'doctorId'>,
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

    constructor(
        appointmentResults: Partial<AppointmentResults> & { doctor?: Doctor },
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
    }
}
