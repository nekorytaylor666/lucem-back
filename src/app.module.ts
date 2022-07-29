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
import { BookingModule } from './modules/booking/booking.module';
import { SpecializationModule } from './modules/specialization/specialization.module';
import { SmartSearchModule } from './modules/helpers/smartSearch/search.module';
import { SearchModule } from './modules/search/search.module';
import { SessionModule } from './modules/session/session.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageUploadController } from './modules/helpers/uploadFiles/imageUpload/imageUpload.controller';
import { AdminModule } from './modules/admin/admin.module';
import { AppointmentBlankModule } from './modules/appointmentBlank/appointmentBlank.module';
import { ForwardsModule } from './modules/forwards/forwards.module';
import { ScriptModule } from './modules/script/script.module';
import { StatsModule } from './modules/stats/stats.module';
import { DoctorStatsModule } from './modules/doctorStats/doctorStats.module';
import { SpecializationStatsModule } from './modules/specializationStats/specializationStats.module';
import { CommentModule } from './modules/comment/comment.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SecretaryModule } from './modules/secretary/secretary.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ICDModule } from './modules/ICD/ICD.module';
import { AWSPhotoUploadModule } from './modules/uploadPhoto/awsSpace.module';

@Module({
    imports: [
        // MulterModule.register({
        //     dest: './uploads',
        // }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // MailerModule.forRootAsync({
        //     useFactory: () => ({
        //         transport: {
        //             host: 'smtp.gmail.com',
        //             port: 587,
        //             auth: {
        //                 user: 'cliniclucem@gmail.com',
        //                 pass: 'Assasin3030',
        //             },
        //         },
        //     }),
        // }),
        AWSPhotoUploadModule,
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
        BookingModule,
        SpecializationModule,
        SearchModule,
        SessionModule,
        AdminModule,
        AppointmentBlankModule,
        ForwardsModule,
        ScriptModule,
        StatsModule,
        DoctorStatsModule,
        SpecializationStatsModule,
        CommentModule,
        NotificationModule,
        SecretaryModule,
        ICDModule,
    ],
    controllers: [AppController, ImageUploadController],
    providers: [AppService],
})
export class AppModule {}
