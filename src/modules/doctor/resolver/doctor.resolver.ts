import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { SpecializationService } from 'src/modules/specialization/service/specialization.service';
import { CreateDoctor } from '../model/createDoctor.args';
import { DoctorGraph } from '../model/doctor.model';
import { DoctorTokenGraph } from '../model/doctor.token.model';
import { DoctorService } from '../service/doctor.service';

@Resolver()
export class DoctorResolver {
    constructor(
        private doctorService: DoctorService,
        private tokenService: TokenService,
        private specService: SpecializationService,
    ) {}

    @Mutation(() => DoctorTokenGraph)
    @UseGuards(PreAuthGuard)
    @Roles('none')
    async registerDoctor(
        @Args() args: CreateDoctor,
        @CurrentRequestURLGraph() req: string,
    ) {
        const doctor = await this.doctorService.createDoctor(args, req);
        const token = this.tokenService.create({
            user: {
                ...doctor,
                _id: doctor._id.toHexString(),
            },
            role: TokenRoles.Doctor,
        });
        args.specializationIds &&
            (await this.specService.attachManyToDoctor({
                specializationIds: args.specializationIds.map(
                    (val) => new ObjectId(val),
                ),
                doctorId: doctor._id,
            }));
        const doctorResponce = new DoctorTokenGraph({ doctor, token });
        return doctorResponce;
    }

    @Query(() => DoctorTokenGraph)
    async loginDoctor(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const doctor = await this.doctorService.login({ email, password });
        const token = this.tokenService.create({
            user: {
                ...doctor,
                _id: doctor._id.toHexString(),
            },
            role: TokenRoles.Doctor,
        });
        const doctorResponce = new DoctorTokenGraph({
            doctor,
            token,
        });
        return doctorResponce;
    }

    @Query(() => DoctorGraph)
    async getDoctorByID(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const doctor = await this.doctorService.findByIdWithAddictives(
            new ObjectId(doctorId),
        );
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

    @Mutation(() => DoctorGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async editDoctorWithFile(
        @Args('image', { type: () => GraphQLUpload })
        image: Promise<FileUpload>,
        @Args('doctorId', { type: () => String }) doctorId: string,
        @CurrentRequestURLGraph() req: string,
    ) {
        const doctor = await this.doctorService.editWithFile({
            image: await image,
            doctorId,
            req,
        });
        const doctorResponce = new DoctorGraph({ ...doctor });
        return doctorResponce;
    }

    @Mutation(() => DoctorGraph)
    @Roles('none') //TODO change to admin role
    @UseGuards(PreAuthGuard)
    async editDoctor(
        @Args() args: CreateDoctor,
        @Args('doctorId', { type: () => String }) doctorId: string,
        @CurrentRequestURLGraph() req: string,
    ) {
        const doctor = await this.doctorService.edit({
            ...args,
            req,
            doctorId: new ObjectId(doctorId),
        });
        const doctorResponce = new DoctorGraph({ ...doctor });
        return doctorResponce;
    }
}
