import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Modify } from 'src/utils/modifyType';
import { WorkTime } from './workTime.interface';

@ObjectType('WorkTime')
export class WorkTimeGraph
    implements
        Modify<
            Omit<WorkTime, 'doctorId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => GraphQLISODateTime)
    startTime: Date;

    @Field(() => GraphQLISODateTime)
    endTime: Date;

    @Field(() => DoctorGraph)
    doctor: DoctorGraph;

    constructor(workTime: Partial<WorkTime> & { doctor?: Doctor }) {
        if (workTime._id) this._id = workTime._id.toHexString();
        if (workTime.doctor)
            this.doctor = new DoctorGraph({ ...workTime.doctor });
        if (workTime.startTime) this.startTime = workTime.startTime;
        if (workTime.endTime) this.endTime = workTime.endTime;
    }
}
