import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { Modify } from 'src/utils/modifyType';
import { SpecializationStats } from './specializationStats.interface';

@ObjectType()
export class SpecializationStatsGraph
    implements
        Modify<
            SpecializationStats,
            {
                specialization: SpecializationGraph;
            }
        >
{
    @Field(() => SpecializationGraph)
    specialization: SpecializationGraph;

    @Field(() => Int)
    individualSpecialistNum: number;

    @Field(() => Int)
    totalMoneyEarnt: number;

    @Field(() => Int)
    totalNumSessions: number;

    constructor(stats: Partial<SpecializationStats>) {
        if (stats.specialization)
            this.specialization = new SpecializationGraph({
                ...stats.specialization,
            });
        if (stats.individualSpecialistNum)
            this.individualSpecialistNum = stats.individualSpecialistNum;
        if (stats.totalMoneyEarnt) this.totalMoneyEarnt = stats.totalMoneyEarnt;
        if (stats.totalNumSessions)
            this.totalNumSessions = stats.totalNumSessions;
    }
}
