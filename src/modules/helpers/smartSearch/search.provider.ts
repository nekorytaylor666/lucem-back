import { ConfigService } from '@nestjs/config';
import { deaseaseShema } from 'src/modules/deseases/model/desease.shema';
import { doctorSchema } from 'src/modules/doctor/model/doctor.schema';
import { serviceSchema } from 'src/modules/service/model/service.schema';
const Typesense = require('typesense');

export const smartSearchFactory = {
    provide: 'SMARTSEARCH_CONNECTION',
    useFactory: async (configService: ConfigService) => {
        try {
            const client = new Typesense.Client({
                nodes: [
                    {
                        host: configService.get('SMARTSEARCH_HOST'),
                        port: configService.get('SMARTSEARCH_PORT'),
                        protocol: 'http',
                    },
                ],
                apiKey: configService.get('SMARTSEARCH_API_KEY'),
                connectionTimeoutSeconds: 2,
            });
            return client;
        } catch (e) {
            throw `${e}`;
        }
    },
    inject: [ConfigService],
};
