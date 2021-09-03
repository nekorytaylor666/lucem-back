import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { MongoModule } from './modules/helpers/database/mongo.module';
import { TokenModule } from './modules/helpers/token/token.module';
import { UserModule } from './modules/user/user.module';
import { DeseasesModule } from './modules/deseases/deseases.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongoModule,
        TokenModule,
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            include: [],
            autoSchemaFile: true,
            sortSchema: true,
            uploads: false,
            resolvers: {},
            context: ({ req, res }) => ({ req, res }),
        }),
        UserModule,
        DeseasesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
