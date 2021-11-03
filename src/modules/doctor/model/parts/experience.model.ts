import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { AllowedExperienceAndEducationTypes } from './experience.enum';

export interface ExperienceAndEducation {
    _id: ObjectId;
    name: AllowedExperienceAndEducationTypes;
    data: {
        years: [number, number];
        description: string;
    }[];
    doctorId: ObjectId;
}

@ObjectType('ExperienceAndEducationData')
export class ExperienceAndEducationDataGraph {
    @Field(() => [Int])
    years: [number, number];

    @Field()
    description: string;

    constructor(args: { years?: [number, number]; description: string }) {
        if (args.years != null) this.years = args.years;
        if (args.description != null) this.description = args.description;
    }
}

@ObjectType('ExperienceAndEducation')
export class ExperienceAndEducationGraph {
    @Field()
    _id: string;

    @Field(() => AllowedExperienceAndEducationTypes)
    name: AllowedExperienceAndEducationTypes;

    @Field(() => [ExperienceAndEducationDataGraph], { nullable: true })
    data: ExperienceAndEducationDataGraph[];

    constructor(args: Partial<ExperienceAndEducation>) {
        if (args._id) this._id = args._id.toHexString();
        if (args.data)
            this.data = args.data.map(
                (val) => new ExperienceAndEducationDataGraph({ ...val }),
            );
        if (args.name) this.name = args.name;
    }
}
