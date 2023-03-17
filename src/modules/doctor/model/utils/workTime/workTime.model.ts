import {
    Field,
    GraphQLISODateTime,
    InputType,
    ObjectType,
} from '@nestjs/graphql';

export interface WorkTime {
    startTime: Date;
    endTime: Date;
    isActive?: boolean;
}

@ObjectType('WorkTime')
export class WorkTimeGraph implements WorkTime {
    @Field(() => GraphQLISODateTime)
    startTime: Date;

    @Field(() => GraphQLISODateTime)
    endTime: Date;

    @Field(() => Boolean, { nullable: true })
    isActive: boolean;

    constructor(workTime: Partial<WorkTime>) {
        if (workTime.startTime != null) this.startTime = workTime.startTime;
        if (workTime.endTime != null) this.endTime = workTime.endTime;
        if (workTime.isActive != null) this.isActive = workTime.isActive;
    }
}

@InputType()
export class WorkTimeInput implements WorkTime {
    @Field(() => GraphQLISODateTime)
    startTime: Date;

    @Field(() => GraphQLISODateTime)
    endTime: Date;

    @Field(() => Boolean, { nullable: true })
    isActive: boolean;
}
