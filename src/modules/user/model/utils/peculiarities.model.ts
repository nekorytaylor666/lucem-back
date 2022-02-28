import { Field, ObjectType } from '@nestjs/graphql';
import { AllowedRHFactorTypes, Peculiarities } from './peculiarities.interface';

@ObjectType('Peculiarities')
export class PeculiaritiesGraph implements Peculiarities {
    @Field(() => [String], { nullable: true })
    allergies?: string[];

    @Field(() => AllowedRHFactorTypes, { nullable: true })
    RHFactor?: AllowedRHFactorTypes;

    @Field({ nullable: true })
    bloodType?: string;

    constructor(args: Partial<Peculiarities>) {
        if (args.RHFactor != null) this.RHFactor = args.RHFactor;
        if (args.allergies != null) this.allergies = args.allergies;
        if (args.bloodType != null) this.bloodType = args.bloodType;
    }
}
