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
import { ServiceModule } from './modules/service/service.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { BookingModule } from './modules/booking/booking.module';
import { SpecializationModule } from './modules/specialization/specialization.module';

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
        ServiceModule,
        TimelineModule,
        BookingModule,
        SpecializationModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
