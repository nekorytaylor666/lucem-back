import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { AppointmentBlankGraph } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
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
        @Args() args: CreateAppointmentBlank,
    ) {
        console.log(user);
        const appointmentBlank = await this.appointmentBlankService.create({
            ...args,
            doctorId: user._id,
        });
        const appointmentResultsResponce = new AppointmentResultsGraph({
            ...appointmentBlank.appointmentResults,
            doctor: user,
        });
        const complaintResponce = new ComplaintGraph({
            ...appointmentBlank.complaint,
            doctor: user,
        });
        const diagnoseResponce = new DiagnoseGraph({
            ...appointmentBlank.diagnose,
            doctor: user,
        });
        const inspecionsResponce = new InspectionsGraph({
            ...appointmentBlank.inspections,
            doctor: user,
        });
        return [
            appointmentResultsResponce,
            complaintResponce,
            diagnoseResponce,
            inspecionsResponce,
        ];
    }

    @Mutation(() => AppointmentResultsGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async addFileAppointmentResult(
        @Args('image', { type: () => GraphQLUpload })
        _image: Promise<FileUpload>,
        @CurrentRequestURLGraph() req: string,
        @Args('appointmentBlankId') _appointmentBlankId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const [image, appointmentBlankId] = [
            await _image,
            new ObjectId(_appointmentBlankId),
        ];
        const appointmentResults =
            await this.appointmentBlankService.addFileToAppointmentResult({
                file: image,
                req,
                appointmentBlankId,
                doctorId: doctor._id,
            });
        const appointmentResultsResponce = new AppointmentResultsGraph({
            ...appointmentResults,
        });
        return appointmentResultsResponce;
    }
}
