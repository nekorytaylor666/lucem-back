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
import { InspectionsGraph } from '../../model/parts/inspections.model';
import { InspectionsService } from '../../service/utils/inspections.service';

@Resolver()
export class InspectionsResolver {
    constructor(private inspectionsService: InspectionsService) {}

    @Query(() => [InspectionsGraph])
    @Roles('admin', 'doctor')
    @UseGuards(PreAuthGuard)
    async getInspectionsOfDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const inspections =
            payload.role === TokenRoles.Doctor
                ? await this.inspectionsService.findOneWithAddictions({
                      doctorId: user._id,
                  })
                : await this.inspectionsService.findOneWithAddictions({
                      doctorId: new ObjectId(doctorId),
                  });
        const inspectionsResponce = inspections.map(
            (val) => new InspectionsGraph({ ...val }),
        );
        return inspectionsResponce;
    }

    @Query(() => [InspectionsGraph])
    @Roles('admin', 'user')
    @UseGuards(PreAuthGuard)
    async getInspectionsOfUser(
        @Args('userId', { type: () => String, nullable: true }) userId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const inspections =
            payload.role === TokenRoles.User
                ? await this.inspectionsService.findOneWithAddictions({
                      userId: user._id,
                  })
                : await this.inspectionsService.findOneWithAddictions({
                      userId: new ObjectId(userId),
                  });
        const inspectionsResponce = inspections.map(
            (val) => new InspectionsGraph({ ...val }),
        );
        return inspectionsResponce;
    }

    @Query(() => InspectionsGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async getInspectionById(
        @Args('inspectionId', { type: () => String }) inspectionId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const inspection = await this.inspectionsService.findOne({
            _id: new ObjectId(inspectionId),
        });
        if (
            payload.role === TokenRoles.User &&
            inspection.userId.toHexString() !== user._id.toHexString()
        )
            throw new ApolloError('this is not your inspection');
        const inspectionResponce = new InspectionsGraph({ ...inspection });
        return inspectionResponce;
    }
}
