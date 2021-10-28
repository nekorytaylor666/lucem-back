import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { SessionModule } from '../session/session.module';
import { AppointmentBlankResolver } from './resolver/appointmentBlank.resolver';
import { AppointmenResultsResolver } from './resolver/parts/appointmentResults.resolver';
import { AppointmentBlankService } from './service/appointmentBlank.service';
import { AppointmenResultsService } from './service/parts/appointmentResult.service';

@Module({
    imports: [MongoModule, UploadFileModule, SessionModule, PreAuthModule],
    providers: [
        AppointmentBlankService,
        AppointmentBlankResolver,
        AppointmenResultsResolver,
        AppointmenResultsService,
    ],
    exports: [AppointmentBlankService],
})
export class AppointmentBlankModule {}
