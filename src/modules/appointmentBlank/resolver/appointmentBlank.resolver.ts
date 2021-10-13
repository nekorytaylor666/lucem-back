import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Doctor } from "src/modules/doctor/model/doctor.interface";
import { Roles } from "src/modules/helpers/auth/auth.roles";
import { CurrentRequestURLGraph, CurrentUserGraph, PreAuthGuard } from "src/modules/helpers/auth/auth.service";
import { AppointmentBlankGraph } from "../model/appointmentBlank.model";
import { CreateAppointmentBlank } from "../model/createAppointmentBlank.args";
import { AppointmentBlankService } from "../service/appointmentBlank.service";


@Resolver()
export class AppointmentBlankResolver {
    constructor(private appointmentBlankService: AppointmentBlankService) {}

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createSessionBlank(
        @CurrentRequestURLGraph() req: string,
        @CurrentUserGraph() user: Doctor,
        @Args() args: CreateAppointmentBlank
    ) {
        const appointmentBlank = await this.appointmentBlankService.create({...args, doctorId: user._id, reqURL: req });
        const appointmentBlankResponce = new AppointmentBlankGraph({...appointmentBlank});
        return appointmentBlankResponce;
    }
}