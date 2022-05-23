import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Service } from 'src/modules/service/model/service.interface';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { Modify } from 'src/utils/modifyType';

export interface SessionData {
    doctorId: ObjectId;
    serviceId: ObjectId;
}

@ObjectType('SessionData')
export class SessionDataGraph
    implements
        Modify<
            SessionData,
            {
                doctorId: string;
                serviceId: string;
            }
        >
{
    @Field()
    doctorId: string;

    @Field()
    serviceId: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => ServiceGraph, { nullable: true })
    service: ServiceGraph;

    constructor(
        data: Partial<
            SessionData & {
                doctor: Doctor;
                service: Service;
            }
        >,
    ) {
        if (data.doctor != null)
            this.doctor = new DoctorGraph({ ...data.doctor });
        if (data.service != null)
            this.service = new ServiceGraph({ ...data.service });
        if (data.doctorId != null) this.doctorId = data.doctorId.toHexString();
        if (data.serviceId != null)
            this.serviceId = data.serviceId.toHexString();
    }
}
