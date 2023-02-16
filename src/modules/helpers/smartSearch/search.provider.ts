import { ConfigService } from '@nestjs/config';
import { deaseaseShema } from 'src/modules/deseases/model/desease.shema';
import { doctorSchema } from 'src/modules/doctor/model/doctor.schema';
import { ICDSchema } from 'src/modules/ICD/model/ICD.schema';
import { serviceSchema } from 'src/modules/service/model/service.schema';
import { specializationSchema } from 'src/modules/specialization/model/specialization.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Typesense = require('typesense');

export const smartSearchFactory = {
    provide: 'SMARTSEARCH_CONNECTION',
    useFactory: async (configService: ConfigService) => {
        try {
            const client = new Typesense.Client({
                nodes: [
                    // {
                    //     host: configService.get('SMARTSEARCH_HOST'),
                    //     port: configService.get('SMARTSEARCH_PORT'),
                    //     protocol: 'https',
                    // },
                    {
                        host: 'tdq34wmyk2ozxnlcp-1.a1.typesense.net',
                        port: 443,
                        protocol: 'https',
                    },
                ],
                apiKey: 'AwRGKXmd5a3S3g1HnAkAJy6kJKSxQ5dT',
                connectionTimeoutSeconds: 5,
            });
            // await client.collections(doctorSchema.name).delete();
            // await client.collections(specializationSchema.name).delete();
            // await client.collections(deaseaseShema.name).delete();
            // await client.collections(serviceSchema.name).delete();
            // await client.collections(ICDSchema.name).delete();
            try {
                await client.collections(ICDSchema.name).retrieve();
                await client.collections(specializationSchema.name).retrieve();
                await client.collections(doctorSchema.name).retrieve();
                await client.collections(deaseaseShema.name).retrieve();
                await client.collections(serviceSchema.name).retrieve();
            } catch (e) {
                console.log(e);
                client
                    .collections()
                    .create(ICDSchema)
                    .catch((e) => {
                        console.log(e);
                    });
                client
                    .collections()
                    .create(specializationSchema)
                    .catch((e) => {
                        console.log(e);
                    });
                client
                    .collections()
                    .create(doctorSchema)
                    .catch((e) => {
                        console.log(e);
                    });
                client
                    .collections()
                    .create(deaseaseShema)
                    .catch((e) => {
                        console.log(e);
                    });
                client
                    .collections()
                    .create(serviceSchema)
                    .catch((e) => {
                        console.log(e);
                    });
            }
            return client;
        } catch (e) {
            console.log(e);

            throw `${e}`;
        }
    },
    inject: [ConfigService],
};
