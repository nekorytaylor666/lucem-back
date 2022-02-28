import { registerEnumType } from '@nestjs/graphql';

export enum AllowedRHFactorTypes {
    Positive = 'positive',
    Negative = 'negative',
}

registerEnumType(AllowedRHFactorTypes, {
    name: 'AllowedRHFactorTypes',
});

export interface Peculiarities {
    allergies?: string[];
    bloodType?: string;
    RHFactor?: AllowedRHFactorTypes;
}
