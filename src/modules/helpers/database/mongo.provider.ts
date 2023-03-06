import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const mongodDbFactory: FactoryProvider<Promise<Db>> = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
            const client = await MongoClient.connect(
                configService.get('MONGO_URL'),
            );

            return client.db(configService.get('MONGO_DB_NAME'));
        } catch (e) {
            throw e;
        }
    },
    inject: [ConfigService],
};
