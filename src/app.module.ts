import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoModule } from './modules/helpers/database/mongo.module';
import { UserModule } from './modules/user/user.module';
import { DeseasesModule } from './modules/deseases/deseases.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ServiceModule } from './modules/service/service.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { BookingModule } from './modules/booking/booking.module';
import { SpecializationModule } from './modules/specialization/specialization.module';
import { SmartSearchModule } from './modules/helpers/smartSearch/search.module';
import { SearchModule } from './modules/search/search.module';
import { RatingModule } from './modules/rating/rating.module';
import { SessionModule } from './modules/session/session.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageUploadController } from './modules/helpers/uploadFiles/imageUpload/imageUpload.controller';
import { AdminModule } from './modules/admin/admin.module';
import { AppointmentBlankModule } from './modules/appointmentBlank/appointmentBlank.module';
import { ForwardsModule } from './modules/forwards/forwards.module';
import { WorkTimeModule } from './modules/workTime/workTime.module';
import { ScriptModule } from './modules/script/script.module';
import { StatsModule } from './modules/stats/stats.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongoModule,
        SmartSearchModule,
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
        SpecializationModule,
        SearchModule,
        RatingModule,
        SessionModule,
        AdminModule,
        AppointmentBlankModule,
        ForwardsModule,
        WorkTimeModule,
        ScriptModule,
        StatsModule,
    ],
    controllers: [AppController, ImageUploadController],
    providers: [AppService],
})
export class AppModule {}
