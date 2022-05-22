import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { Session } from 'src/modules/session/model/session.interface';
import { User } from 'src/modules/user/model/user.interface';
import {
    Inspections,
    InspectionsGraph,
} from '../../model/parts/inspections.model';
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
                ? await this.inspectionsService.findWithAddictivesCursor<
                      Inspections & {
                          doctor: Doctor;
                          user: User;
                          session: Session;
                      }
                  >({
                      find: { doctorId: user._id },
                      lookups: this.inspectionsService.basicLookups,
                  })
                : await this.inspectionsService.findWithAddictivesCursor<
                      Inspections & {
                          doctor: Doctor;
                          user: User;
                          session: Session;
                      }
                  >({
                      find: { userId: new ObjectId(doctorId) },
                      lookups: this.inspectionsService.basicLookups,
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
                ? await this.inspectionsService
                      .findWithAddictivesCursor<
                          Inspections & {
                              doctor: Doctor;
                              user: User;
                              session: Session;
                          }
                      >({
                          find: { userId: user._id },
                          lookups: this.inspectionsService.basicLookups,
                      })
                      .toArray()
                : await this.inspectionsService
                      .findWithAddictivesCursor<
                          Inspections & {
                              doctor: Doctor;
                              user: User;
                              session: Session;
                          }
                      >({
                          find: { userId: new ObjectId(userId) },
                          lookups: this.inspectionsService.basicLookups,
                      })
                      .toArray();
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

    @Mutation(() => InspectionsGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editInspections(
        @Args('descriptions', { type: () => [String] }) descriptions: string[],
        @Args('images', { type: () => [GraphQLUpload] })
        images: Promise<FileUpload[]>,
        @Args('sessionId', { type: () => String }) sessionId: string,
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
    ) {
        const inspections = await this.inspectionsService.edit({
            descriptions,
            images,
            sessionId: new ObjectId(sessionId),
            doctorId: doctor._id,
            req,
        });
        const inspectionResponce = new InspectionsGraph({ ...inspections });
        return inspectionResponce;
    }
}
