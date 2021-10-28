import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { paginate } from 'src/utils/paginate';
import { AppointmentBlankGraph } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { AppointmentBlankService } from '../service/appointmentBlank.service';

@Resolver()
export class AppointmentBlankResolver {
    constructor(private appointmentBlankService: AppointmentBlankService) {}

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createSessionBlank(
        @CurrentUserGraph() user: Doctor,
        @Args() args: CreateAppointmentBlank,
    ) {
        const appointmentBlank = await this.appointmentBlankService.create({
            ...args,
            doctorId: user._id,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Query(() => [AppointmentBlankGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getAppointmentBlankByUserId(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
    ) {
        const blankCursor =
            this.appointmentBlankService.findWithAddictivesCursor({
                userId: new ObjectId(userId),
            });
        const blank = await paginate({
            cursor: blankCursor,
            page,
            elementsPerPage: 10,
        });
        const blankResponce = blank.map(
            (val) => new AppointmentBlankGraph({ ...val }),
        );
        return blankResponce;
    }

    @Mutation(() => AppointmentBlankGraph)
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
        const appointmentBlank =
            await this.appointmentBlankService.addFileToAppointmentResult({
                file: image,
                req,
                appointmentBlankId,
                doctorId: doctor._id,
            });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }
}
