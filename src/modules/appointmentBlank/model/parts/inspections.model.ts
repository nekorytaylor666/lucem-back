import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';

export interface Inspections {
    _id: ObjectId;
    doctorId: ObjectId;
    inspections: string[];
}

@ObjectType()
export class InspectionsGraph {
    @Field()
    _id: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => [String])
    inspections: string[];

    constructor(inspections: Partial<Inspections> & { doctor: Doctor }) {
        if (inspections._id) this._id = inspections._id.toHexString();
        if (inspections.doctor)
            this.doctor = new DoctorGraph({ ...inspections.doctor });
        if (inspections.inspections) this.inspections = inspections.inspections;
    }
}
