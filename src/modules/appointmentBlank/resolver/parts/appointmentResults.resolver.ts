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
import { AppointmentResultsGraph } from '../../model/parts/AppointmenResults.model';
import { AppointmenResultsService } from '../../service/parts/appointmentResult.service';

@Resolver()
export class AppointmenResultsResolver {
    constructor(private appointmentResultsService: AppointmenResultsService) {}

    @Query(() => [AppointmentResultsGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getAppointmentResultsByDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const appointmentResults =
            payload.role === TokenRoles.Doctor
                ? await this.appointmentResultsService.findWithAddictives({
                      doctorId: user._id,
                  })
                : await this.appointmentResultsService.findWithAddictives({
                      doctorId: new ObjectId(doctorId),
                  });
        const appointmentResultsResponce = appointmentResults.map(
            (val) => new AppointmentResultsGraph({ ...val }),
        );
        return appointmentResultsResponce;
    }

    @Query(() => [AppointmentResultsGraph])
    @Roles('doctor', 'admin', 'user')
    @UseGuards(PreAuthGuard)
    async getAppointmentResultsByUser(
        @Args('userId', { type: () => String }) userId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const appointmentResults =
            payload.role === TokenRoles.User
                ? await this.appointmentResultsService.findWithAddictives({
                      userId: new ObjectId(userId),
                  })
                : await this.appointmentResultsService.findWithAddictives({
                      userId: user._id,
                  });
        console.log(appointmentResults);
        const appointmentResultsResponce = appointmentResults.map(
            (val) => new AppointmentResultsGraph({ ...val }),
        );
        return appointmentResultsResponce;
    }
}
