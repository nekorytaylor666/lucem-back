import { registerEnumType } from '@nestjs/graphql';

export enum AllowedDoctorLanguages {
    Kazakh = 'kazakh',
    English = 'english',
    Russian = 'russian',
}

registerEnumType(AllowedDoctorLanguages, {
    name: 'AllowedDoctorLanguages',
});
