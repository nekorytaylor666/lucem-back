import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { AppointmentBlankGraph } from '../../model/appointmentBlank.model';
import { AppointmentResultsGraph } from '../../model/parts/AppointmenResults.model';
import { AppointmenResultsService } from '../../service/parts/appointmentResult.service';

@Resolver()
export class AppointmenResultsResolver {
    constructor(private appointmentResultsService: AppointmenResultsService) {}

    @Query(() => [AppointmentResultsGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async findAppointmentResultsByDoctorId(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const appointmentResults =
            payload.role === TokenRoles.Doctor
                ? await this.appointmentResultsService.find({
                      doctorId: user._id,
                  })
                : await this.appointmentResultsService.find({
                      doctorId: new ObjectId(doctorId),
                  });
        const appointmentResultsResponce = appointmentResults.map(
            (val) => new AppointmentResultsGraph({ ...val }),
        );
        return appointmentResultsResponce;
    }
}
