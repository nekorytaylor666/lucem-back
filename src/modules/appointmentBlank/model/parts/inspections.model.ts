import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import {
    PhotoURLGraph,
    PhotoURLInput,
} from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';

export interface Inspections {
    _id: ObjectId;
    description?: string;
    images?: PhotoURL[];
    doctorId: ObjectId;
}

@InputType()
export class InspectionsDataInput {
    @Field({ nullable: true })
    description?: string;

    @Field(() => [GraphQLUpload], { nullable: true })
    images?: Promise<FileUpload[]>;
}

@InputType()
export class EditInspectionsDataInput {
    @Field({ nullable: true })
    description?: string;

    @Field(() => [GraphQLUpload], { nullable: true })
    images?: Promise<FileUpload>[];

    @Field(() => [PhotoURLInput])
    photoURL?: PhotoURLInput[];
}

@InputType()
export class CreateInspections {
    @Field(() => [InspectionsDataInput])
    data: InspectionsDataInput[];
}

@InputType()
export class EditInspections {
    @Field(() => [EditInspectionsDataInput])
    data: EditInspectionsDataInput[];

    @Field({ nullable: true })
    doctorId: string;
}

@ObjectType('Inspections')
export class InspectionsGraph {
    @Field()
    _id: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => [PhotoURLGraph], { nullable: true })
    images?: PhotoURLGraph[];

    @Field()
    doctorId: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    constructor(
        inspections: Partial<
            Inspections & {
                doctor: Doctor;
            }
        >,
    ) {
        if (inspections._id != null) this._id = inspections._id.toHexString();
        if (inspections.description != null)
            this.description = inspections.description;
        if (inspections.images != null)
            this.images = inspections.images.map(
                (val) => new PhotoURLGraph({ ...val }),
            );
        if (inspections.doctorId != null)
            this.doctorId = inspections.doctorId.toHexString();
        if (inspections.doctor != null)
            this.doctor = new DoctorGraph({ ...inspections.doctor });
    }
}
