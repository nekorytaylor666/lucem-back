import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { CreateDoctor } from '../model/createDoctor.args';
import { DoctorGraph } from '../model/doctor.model';
import { DoctorService } from '../service/doctor.service';

@Resolver()
export class DoctorResolver {
    constructor(private doctorService: DoctorService) {}

    @Mutation(() => DoctorGraph)
    @UseGuards(PreAuthGuard)
    @Roles('none')
    async registerDoctor(
        @Args() args: CreateDoctor,
        @CurrentRequestURLGraph() req: string,
    ) {
        const createDoctor = await this.doctorService.createDoctor(args, req);
        const doctorResponce = new DoctorGraph({ ...createDoctor });
        return doctorResponce;
    }

    @Query(() => DoctorGraph)
    async loginDoctor(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const doctor = await this.doctorService.login({ email, password });
        const doctorResponce = new DoctorGraph({ ...doctor });
        return doctorResponce;
    }

    @Query(() => DoctorGraph)
    async getDoctorByID(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const doctor = await this.doctorService.findOne({
            _id: new ObjectId(doctorId),
        });
        const doctorResponce = new DoctorGraph({ ...doctor });
        return doctorResponce;
    }

    @Query(() => [DoctorGraph])
    async getAllDoctors() {
        const doctors = await this.doctorService.listWithAddictives();
        const doctorResponce = doctors.map(
            (val) => new DoctorGraph({ ...val }),
        );
        return doctorResponce;
    }
}
