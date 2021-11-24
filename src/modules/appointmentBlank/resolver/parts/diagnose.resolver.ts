import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { DiagnoseGraph } from '../../model/parts/diagnose.model';
import { DiagnoseService } from '../../service/parts/diagnose.service';

@Resolver()
export class DiagnoseResolver {
    constructor(private diagnoseService: DiagnoseService) {}

    @Query(() => [DiagnoseGraph])
    @Roles('doctor', 'user', 'admin')
    @UseGuards(PreAuthGuard)
    async getDiagnoseOfDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const diagnoses =
            payload.role === TokenRoles.Doctor
                ? await this.diagnoseService.findOneWithAddictives({
                      doctorId: user._id,
                  })
                : await this.diagnoseService.findOneWithAddictives({
                      doctorId: new ObjectId(doctorId),
                  });
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
                ? await this.diagnoseService.findOneWithAddictives({
                      userId: user._id,
                  })
                : await this.diagnoseService.findOneWithAddictives({
                      userId: new ObjectId(userId),
                  });
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
}
