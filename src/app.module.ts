import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { MongoModule } from './modules/helpers/database/mongo.module';
import { TokenModule } from './modules/helpers/token/token.module';
import { UserModule } from './modules/user/user.module';
import { DeseasesModule } from './modules/deseases/deseases.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ServiceModule } from './modules/service/service.module';

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
        DoctorModule,
        ScheduleModule,
        ServiceModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
