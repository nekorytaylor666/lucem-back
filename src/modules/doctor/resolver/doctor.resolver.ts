import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { SpecializationService } from 'src/modules/specialization/service/specialization.service';
import { CreateDoctor } from '../model/createDoctor.args';
import { Doctor } from '../model/doctor.interface';
import { DoctorGraph } from '../model/doctor.model';
import { DoctorTokenGraph } from '../model/doctor.token.model';
import { EditDoctor } from '../model/editDoctor.args';
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
    @Roles('doctor', 'admin') //TODO change to admin role
    @UseGuards(PreAuthGuard)
    async editDoctor(
        @Args() args: EditDoctor,
        @CurrentRequestURLGraph() req: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const doctor =
            payload.role === TokenRoles.Doctor
                ? await this.doctorService.edit({
                      ...args,
                      doctorId: user._id.toHexString(),
                      req,
                  })
                : await this.doctorService.edit({
                      ...args,
                      req,
                  });
        const doctorResponce = new DoctorGraph({ ...doctor });
        return doctorResponce;
    }

    @Mutation(() => DoctorGraph)
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async deleteDoctor(
        @Args('doctorId', { nullable: true }) doctorId: string,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const findQuery: Partial<Doctor> =
            payload.role === TokenRoles.Doctor
                ? { _id: user._id }
                : { _id: new ObjectId(doctorId) };
        const doctor = await this.doctorService.updateOne({
            find: findQuery,
            update: { isDeleted: true },
            method: '$set',
        });
        const doctorResponce = new DoctorGraph({ ...doctor });
        return doctorResponce;
    }

    @Query(() => [DoctorGraph])
    async getShit() {
        const doctors = await this.doctorService.findWithOptions({
            fields: ['experiences'],
            values: [{ $elemMatch: { $eq: null } }],
        });
        const doctorsResponce = doctors.map(
            (val) => new DoctorGraph({ ...val }),
        );
        return doctorsResponce;
    }

    @Query(() => [DoctorGraph])
    async getDoctorsBySpecializationId(
        @Args('specializationId', { type: () => String })
        specializationId: string,
    ) {
        const specialization = (
            await this.specService
                .findWithAddictivesCursor<
                    Specialization & {
                        doctors: Doctor[];
                    }
                >({
                    find: {
                        _id: new ObjectId(specializationId),
                    },
                    lookups: [
                        this.specService.basicLookups.find(
                            (val) => val.from === 'doctor',
                        ),
                    ],
                })
                .toArray()
        )[0];
        const doctorsResponce = specialization.doctors.map(
            (val) => new DoctorGraph({ ...val }),
        );
        return doctorsResponce;
    }
}
