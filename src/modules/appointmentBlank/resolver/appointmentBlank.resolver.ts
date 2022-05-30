import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { paginate } from 'src/utils/paginate';
import { AppointmentBlankGraph } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentBlankService } from '../service/appointmentBlank.service';

@Resolver()
export class AppointmentBlankResolver {
    constructor(
        private appointmentBlankService: AppointmentBlankService,
        private sessionService: SessionService,
    ) {}

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: CreateAppointmentBlank,
    ) {
        const session = await this.sessionService.findOne({
            doctorId: doctor._id,
            _id: new ObjectId(args.sessionId),
        });
        const appointmentBlank = await this.appointmentBlankService.create({
            ...args,
            req,
            session,
            doctorId: doctor._id,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
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
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async addDoctorToAppointmentBlank(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('appointmentBlankId', { type: () => String })
        appointmentBlankId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentBlank =
            await this.appointmentBlankService.updateOneWithOptions({
                findField: ['_id', 'owners'],
                findValue: [
                    new ObjectId(appointmentBlankId),
                    { $elemMatch: { doctorId: { $eq: doctor._id } } },
                ],
                updateField: ['owners'],
                updateValue: [{ doctorId: new ObjectId(doctorId) }],
                method: '$addToSet',
            });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Query(() => [AppointmentBlankGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async getAppointmentBlanksOfUser(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentBlanksCursor =
            await this.appointmentBlankService.getMultipleWithAddictives({
                userId: new ObjectId(userId),
                doctorId: doctor._id,
            });
        const _appointmentBlanks = await paginate({
            cursor: appointmentBlanksCursor,
            page: 1,
            elementsPerPage: 10,
        });
        const appointmentBlanks = _appointmentBlanks.map((val) => {
            return {
                ...val,
                complaint: (val.complaint as any) != 'null' && {
                    ...val.complaint,
                    doctor: val.complaintDoctor,
                },
                inspections:
                    (val.inspections as any) != 'null'
                        ? val.inspections.map((val1) => {
                              return {
                                  ...val1,
                                  doctor: val.inspectionsDoctors.find(
                                      (val2) =>
                                          val2._id.toHexString() ===
                                          val1.doctorId.toHexString(),
                                  ),
                              };
                          })
                        : undefined,
                appointmentResults:
                    (val.appointmentResults as any) != 'null'
                        ? val.appointmentResults.map((val1) => {
                              return {
                                  ...val1,
                                  doctor: val.appointmentResultsDoctors.find(
                                      (val2) =>
                                          val2._id.toHexString() ===
                                          val1.doctorId.toHexString(),
                                  ),
                              };
                          })
                        : undefined,
                diagnose: (val.diagnose as any) != 'null' && {
                    ...val.diagnose,
                    doctor: val.diagnoseDoctor,
                },
            };
        });
        const appointmentBlanksResponce = appointmentBlanks.map(
            (val) => new AppointmentBlankGraph({ ...val }),
        );
        return appointmentBlanksResponce;
    }
}
