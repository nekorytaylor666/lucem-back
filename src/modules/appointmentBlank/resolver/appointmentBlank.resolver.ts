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
import { AppointmentBlankService } from '../service/appointmentBlank.service';

@Resolver()
export class AppointmentBlankResolver {
    constructor(private appointmentBlankService: AppointmentBlankService) {}

    @Mutation(() => AppointmentBlankGraph)
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
        const appointmentBlankResponce = new AppointmentBlankGraph({
            complaint: { ...appointmentBlank.complaint },
            diagnose: { ...appointmentBlank.diagnose },
            inspection: { ...appointmentBlank.inspections },
            appointmentResults: { ...appointmentBlank.appointmentResult },
        });
        return appointmentBlankResponce;
    }

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: EditAppointmentBlank,
    ) {
        const appointmentBlank = await this.appointmentBlankService.edit({
            ...args,
            req,
            doctorId: doctor._id,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            inspection: { ...appointmentBlank[0] },
            diagnose: { ...appointmentBlank[1] },
            appointmentResults: { ...appointmentBlank[2] },
            complaint: { ...appointmentBlank[3] },
        });
        return appointmentBlankResponce;
    }
}
