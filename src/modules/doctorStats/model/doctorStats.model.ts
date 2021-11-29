import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { Modify } from 'src/utils/modifyType';
import { DoctorSpecStats } from './doctorStats.interface';

@ObjectType()
export class DoctorSpecStatsGraph
    implements
        Modify<
            DoctorSpecStats,
            {
                specialization: SpecializationGraph;
                doctor: DoctorGraph;
            }
        >
{
    @Field(() => DoctorGraph)
    doctor: DoctorGraph;

    @Field(() => SpecializationGraph, { nullable: true })
    specialization: SpecializationGraph;

    @Field(() => Int, { defaultValue: 0 })
    totalMoneyEarnt: number;

    @Field(() => Int, { defaultValue: 0 })
    totalNumOfSessions: number;

    constructor(stats: Partial<DoctorSpecStats>) {
        if (stats.specialization)
            this.specialization = new SpecializationGraph({
                ...stats.specialization,
            });
        if (stats.doctor) this.doctor = new DoctorGraph({ ...stats.doctor });
        if (stats.totalMoneyEarnt) this.totalMoneyEarnt = stats.totalMoneyEarnt;
        if (stats.totalNumOfSessions)
            this.totalNumOfSessions = stats.totalNumOfSessions;
    }
}
