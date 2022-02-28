import { Field, InputType } from '@nestjs/graphql';
import { AllowedRHFactorTypes, Peculiarities } from './peculiarities.interface';

@InputType()
export class PeculiaritiesInput implements Peculiarities {
    @Field({ nullable: true })
    bloodType?: string;

    @Field(() => [String], { nullable: true })
    allergies?: string[];

    @Field(() => AllowedRHFactorTypes, { nullable: true })
    RHFactor?: AllowedRHFactorTypes;
}
