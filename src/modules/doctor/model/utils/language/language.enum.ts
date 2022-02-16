import { registerEnumType } from '@nestjs/graphql';

export enum AllowedLanguages {
    Kazakh = 'kazakh',
    English = 'english',
    Russian = 'russian',
}

export enum AllowedLanguageTypes {
    First = 'first',
    Fluently = 'fluently',
}

registerEnumType(AllowedLanguages, {
    name: 'AllowedDoctorLanguages',
});

registerEnumType(AllowedLanguageTypes, {
    name: 'AllowedDoctorLanguageTypes',
});
