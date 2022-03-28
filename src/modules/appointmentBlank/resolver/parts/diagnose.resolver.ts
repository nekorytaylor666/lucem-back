import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { Session } from 'src/modules/session/model/session.interface';
import { User } from 'src/modules/user/model/user.interface';
import { Diagnose, DiagnoseGraph } from '../../model/parts/diagnose.model';
import { DiagnoseService } from '../../service/utils/diagnose.service';

@Resolver()
export class DiagnoseResolver {
    constructor(private diagnoseService: DiagnoseService) {}

    @Query(() => [DiagnoseGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getDiagnoseOfDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const diagnoses =
            payload.role === TokenRoles.Doctor
                ? await this.diagnoseService
                      .findWithAddictivesCursor<
                          Diagnose & {
                              doctor: Doctor;
                              user: User;
                              session: Session;
                          }
                      >({
                          find: { doctorId: user._id },
                          lookups: this.diagnoseService.basicLookups,
                      })
                      .toArray()
                : await this.diagnoseService
                      .findWithAddictivesCursor<
                          Diagnose & {
                              doctor: Doctor;
                              user: User;
                              session: Session;
                          }
                      >({
                          find: { doctorId: new ObjectId(doctorId) },
                          lookups: this.diagnoseService.basicLookups,
                      })
                      .toArray();
        const diagnosesResponce = diagnoses.map(
            (val) => new DiagnoseGraph({ ...val }),
        );
        return diagnosesResponce;
    }

    @Query(() => [DiagnoseGraph])
    @Roles('doctor', 'user', 'admin')
    @UseGuards(PreAuthGuard)
    async getDiagnoseOfUser(
        @Args('userId', { type: () => String, nullable: true }) userId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const diagnoses =
            payload.role === TokenRoles.User
                ? await this.diagnoseService
                      .findWithAddictivesCursor<
                          Diagnose & {
                              doctor: Doctor;
                              user: User;
                              session: Session;
                          }
                      >({
                          find: { userId: user._id },
                          lookups: this.diagnoseService.basicLookups,
                      })
                      .toArray()
                : await this.diagnoseService
                      .findWithAddictivesCursor<
                          Diagnose & {
                              doctor: Doctor;
                              user: User;
                          }
                      >({
                          find: { userId: new ObjectId(userId) },
                          lookups: this.diagnoseService.basicLookups,
                      })
                      .toArray();
        const diagnosesResponce = diagnoses.map(
            (val) => new DiagnoseGraph({ ...val }),
        );
        return diagnosesResponce;
    }

    @Query(() => DiagnoseGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async getDiagnoseById(
        @Args('diagnoseId', { type: () => String }) diagnoseId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const diagnose = await this.diagnoseService.findOne({
            _id: new ObjectId(diagnoseId),
        });
        if (
            payload.role === TokenRoles.User &&
            user._id.toHexString() !== diagnose.userId.toHexString()
        )
            throw new ApolloError('this is not your diagnose');
        const diagnoseResponce = new DiagnoseGraph({ ...diagnose });
        return diagnoseResponce;
    }

    @Mutation(() => DiagnoseGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editDiagnose(
        @Args('preliminary', { type: () => String, nullable: true })
        preliminary: boolean,
        @Args('deseaseDBCode', { type: () => String, nullable: true })
        deseaseDBCode: string,
        @Args('diagnose', { type: () => String, nullable: true })
        _diagnose: string,
        @Args('natureOfTheDesease', { type: () => String, nullable: true })
        natureOfTheDesease: string,
        @Args('sessionId', { type: () => String }) sessionId: ObjectId,
        @CurrentUserGraph() doctor: { _id: ObjectId },
    ) {
        const diagnose = await this.diagnoseService.edit({
            preliminary,
            sessionId: new ObjectId(sessionId),
            diagnose: _diagnose,
            natureOfTheDesease,
            doctorId: doctor._id,
            deseaseDBCode,
        });
        const diagnoseResponce = new DiagnoseGraph({ ...diagnose });
        return diagnoseResponce;
    }
}
