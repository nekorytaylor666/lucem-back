import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { Session } from 'src/modules/session/model/session.interface';
import { SessionGraph } from 'src/modules/session/model/session.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { AppointmentBlank } from '../appointmentBlank.model';

export interface Inspections extends AppointmentBlank {
    _id: ObjectId;
    descriptions?: string[];
    images?: PhotoURL[];
}

@ArgsType()
export class CreateInspections {
    @Field(() => [GraphQLUpload], { nullable: true })
    images: Promise<FileUpload[]>;

    @Field(() => [String], { nullable: true })
    descriptions: string[];
}

@ObjectType('Inspections')
export class InspectionsGraph {
    @Field()
    _id: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => [String], { nullable: true })
    descriptions: string[];

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field(() => [PhotoURLGraph], { nullable: true })
    images: PhotoURLGraph[];

    @Field(() => SessionGraph, { nullable: true })
    session: SessionGraph;

    constructor(
        inspections: Partial<Inspections> & {
            doctor?: Doctor;
            user?: User;
            session?: Session;
        },
    ) {
        if (inspections._id != null) this._id = inspections._id.toHexString();
        if (inspections.doctor != null)
            this.doctor = new DoctorGraph({ ...inspections.doctor });
        if (inspections.descriptions != null)
            this.descriptions = inspections.descriptions;
        if (inspections.user != null)
            this.session = new SessionGraph({ ...inspections.session });
        if (inspections.images != null)
            this.images = inspections.images.map(
                (val) => new PhotoURLGraph({ ...val }),
            );
    }
}
