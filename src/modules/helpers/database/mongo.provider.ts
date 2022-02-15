import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const mongodDbFactory: FactoryProvider<Promise<Db>> = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
            // const client = await MongoClient.connect(
            //     configService.get('MONGO_URL'),
            //     {
            //         keepAlive: true,
            //         noDelay: true,
            //         sslCA:
            //             process.env.NODE_ENV === 'production'
            //                 ? join(process.cwd(), 'ca-certificate.crt')
            //                 : null,
            //     },
            // );
            const client = await MongoClient.connect(
                configService.get('MONGO_URL'),
            );
            const database = client.db(configService.get('MONGO_DB_NAME'));
            return database;
        } catch (e) {
            throw e;
        }
    },
    inject: [ConfigService],
};
