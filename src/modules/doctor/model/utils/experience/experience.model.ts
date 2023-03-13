import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { AllowedExperienceAndEducationTypes } from './experience.enum';

export interface ExperienceAndEducation {
    _id: ObjectId;
    name: AllowedExperienceAndEducationTypes;
    data: {
        years?: [number, number];
        institutionName: string;
        specialty: string;
    }[];
}

@ObjectType('ExperienceAndEducationData')
export class ExperienceAndEducationDataGraph {
    @Field(() => [Int])
    years: [number, number];

    @Field()
    institutionName: string;

    @Field()
    specialty: string;

    constructor(args: {
        years?: [number, number];
        institutionName: string;
        specialty: string;
    }) {
        if (args.years != null) this.years = args.years;
        if (args.years == null) this.years = [0, 0];
        if (args.institutionName != null)
            this.institutionName = args.institutionName;
        if (args.specialty != null) this.specialty = args.specialty;
    }
}

@ObjectType('ExperienceAndEducation')
export class ExperienceAndEducationGraph {
    @Field()
    _id: string;

    @Field(() => AllowedExperienceAndEducationTypes, { nullable: true })
    name: AllowedExperienceAndEducationTypes;

    @Field(() => [ExperienceAndEducationDataGraph], { nullable: true })
    data: ExperienceAndEducationDataGraph[];

    constructor(args: Partial<ExperienceAndEducation>) {
        if (args._id != null) this._id = args._id.toHexString();
        if (args.data != null)
            this.data = args.data.map(
                (val) => new ExperienceAndEducationDataGraph({ ...val }),
            );
        if (args.name != null) this.name = args.name;
    }
}
