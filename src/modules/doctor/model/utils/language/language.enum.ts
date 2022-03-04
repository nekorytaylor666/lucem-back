import { registerEnumType } from '@nestjs/graphql';

export enum AllowedLanguages {
    Kazakh = 'kazakh',
    English = 'english',
    Russian = 'russian',
    Turkish = 'turkish',
    German = 'german',
}

export enum AllowedLanguageTypes {
    First = 'first',
    Fluently = 'fluently',
    Basic = 'basic',
}

registerEnumType(AllowedLanguages, {
    name: 'AllowedDoctorLanguages',
});

registerEnumType(AllowedLanguageTypes, {
    name: 'AllowedDoctorLanguageTypes',
});
