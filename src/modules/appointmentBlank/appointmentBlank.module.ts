import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { SessionModule } from '../session/session.module';
import { AppointmentBlankResolver } from './resolver/appointmentBlank.resolver';
import { AppointmenResultsResolver } from './resolver/parts/appointmentResults.resolver';
import { ComplaintResolver } from './resolver/parts/complaint.resolver';
import { DiagnoseResolver } from './resolver/parts/diagnose.resolver';
import { InspectionsResolver } from './resolver/parts/inspections.resolver';
import { AppointmentBlankService } from './service/appointmentBlank.service';
import { AppointmenResultsService } from './service/utils/appointmentResult.service';
import { ComplaintService } from './service/utils/complaint.service';
import { DiagnoseService } from './service/utils/diagnose.service';
import { InspectionsService } from './service/utils/inspections.service';

@Module({
    imports: [MongoModule, UploadFileModule, SessionModule, PreAuthModule],
    providers: [
        AppointmentBlankService,
        AppointmentBlankResolver,
        AppointmenResultsResolver,
        AppointmenResultsService,
        InspectionsService,
        InspectionsResolver,
        DiagnoseService,
        DiagnoseResolver,
        ComplaintService,
        ComplaintResolver,
    ],
    exports: [AppointmentBlankService],
})
export class AppointmentBlankModule {}
