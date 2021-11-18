import { registerEnumType } from '@nestjs/graphql';

export enum AllowedGraphTypes {
    Money = 'money',
    people = 'people',
}

export enum AllowedPeriodsOfTime {
    Year = 'year',
    Month = 'month',
}

registerEnumType(AllowedGraphTypes, {
    name: 'AllowedGraphTypes',
});

registerEnumType(AllowedPeriodsOfTime, {
    name: 'AllowedPeriodsOfTime',
});

export interface Stats {
    startDate: Date;
    endDate: Date;
    totalMoneyEarnt: number;
    totalIndividualPatients: number;
    totalSessionSum: number;
    data: {
        month: number;
        day?: number;
        year?: number;
        sum: number;
        type: AllowedGraphTypes;
    }[];
}
