import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { AppointmentBlankGraph } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentResultsGraph } from '../model/parts/AppointmenResults.model';
import { ComplaintGraph } from '../model/parts/complaint.model';
import { DiagnoseGraph } from '../model/parts/diagnose.model';
import { InspectionsGraph } from '../model/parts/inspections.model';
import { AppointmentBlankService } from '../service/appointmentBlank.service';

@Resolver()
export class AppointmentBlankResolver {
    constructor(private appointmentBlankService: AppointmentBlankService) {}

    @Mutation(() => [AppointmentBlankGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createSessionBlank(
        @CurrentUserGraph() user: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: CreateAppointmentBlank,
    ) {
        const appointmentBlank = await this.appointmentBlankService.create({
            ...args,
            doctorId: user._id,
            req,
        });
        const complaintResponce =
            appointmentBlank.complaint &&
            new ComplaintGraph({
                ...appointmentBlank.complaint,
                doctor: user,
            });
        const diagnoseResponce =
            appointmentBlank.diagnose &&
            new DiagnoseGraph({
                ...appointmentBlank.diagnose,
                doctor: user,
            });
        const inspecionsResponce =
            appointmentBlank.inspections &&
            new InspectionsGraph({
                ...appointmentBlank.inspections,
                doctor: user,
            });
        const appointmentResult =
            appointmentBlank.appointmentResult &&
            new AppointmentResultsGraph({
                ...appointmentBlank.appointmentResult,
                doctor: user,
            });
        return [
            complaintResponce,
            diagnoseResponce,
            inspecionsResponce,
            appointmentResult,
        ];
    }

    @Mutation(() => [AppointmentBlankGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @Args() args: EditAppointmentBlank,
    ) {
        const appointmentBlank = await this.appointmentBlankService.edit({
            ...args,
            doctorId: doctor._id,
        });
        const inspectionsResponce = new InspectionsGraph({
            ...appointmentBlank[0],
        });
        const diagnoseResponce = new DiagnoseGraph({ ...appointmentBlank[1] });
        const appointmentResultResponce = new AppointmentResultsGraph({
            ...appointmentBlank[2],
        });
        const complaintResponce = new ComplaintGraph({
            ...appointmentBlank[3],
        });
        return [
            inspectionsResponce,
            diagnoseResponce,
            appointmentResultResponce,
            complaintResponce,
        ];
    }
}
