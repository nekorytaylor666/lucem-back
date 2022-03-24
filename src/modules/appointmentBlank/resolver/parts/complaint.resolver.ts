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
import { User } from 'src/modules/user/model/user.interface';
import { Complaint, ComplaintGraph } from '../../model/parts/complaint.model';
import { ComplaintService } from '../../service/utils/complaint.service';

@Resolver()
export class ComplaintResolver {
    constructor(private complaintService: ComplaintService) {}

    @Query(() => [ComplaintGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getComplaintsByDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const complaints =
            payload.role === TokenRoles.Doctor
                ? await this.complaintService
                      .findWithAddictivesCursor<
                          Complaint & {
                              doctor: Doctor;
                              user: User;
                          }
                      >({
                          find: { doctorId: user._id },
                          lookups: this.complaintService.basicLookups,
                      })
                      .toArray()
                : await this.complaintService
                      .findWithAddictivesCursor<
                          Complaint & {
                              doctor: Doctor;
                              user: User;
                          }
                      >({
                          find: { doctorId: new ObjectId(doctorId) },
                          lookups: this.complaintService.basicLookups,
                      })
                      .toArray();
        const complaintResponce = complaints.map(
            (val) => new ComplaintGraph({ ...val }),
        );
        return complaintResponce;
    }

    @Query(() => [ComplaintGraph])
    @Roles('user', 'doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getComplaintsOfUser(
        @Args('userId', { type: () => String, nullable: true }) userId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const complaints =
            payload.role === TokenRoles.User
                ? await this.complaintService.findWithAddictivesCursor<
                      Complaint & {
                          doctor: Doctor;
                          user: User;
                      }
                  >({
                      find: { userId: user._id },
                      lookups: this.complaintService.basicLookups,
                  })
                : await this.complaintService.findWithAddictivesCursor<
                      Complaint & {
                          doctor: Doctor;
                          user: User;
                      }
                  >({
                      find: { userId: new ObjectId(userId) },
                      lookups: this.complaintService.basicLookups,
                  });
        const complaintsResponce = complaints.map(
            (val) => new ComplaintGraph({ ...val }),
        );
        return complaintsResponce;
    }

    @Query(() => ComplaintGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async getComplaintById(
        @Args('comlaintId', { type: () => String }) complaintId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const complaint = await this.complaintService.findOne({
            _id: new ObjectId(complaintId),
        });
        if (
            payload.role === TokenRoles.User &&
            complaint.userId.toHexString() !== user._id.toHexString()
        )
            throw new ApolloError('this is not your complaint');
        const complaintResponce = new ComplaintGraph({ ...complaint });
        return complaintResponce;
    }

    @Mutation(() => ComplaintGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editComplaint(
        @Args('complaintId', { type: () => String }) complaintId: string,
        @Args('complaintText', { type: () => String }) complaintText: string,
        @Args('sicknessTimeDuration', { type: () => String })
        sicknessTimeDuration: string,
        @Args('reason', { type: () => String }) reason: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const complaint = await this.complaintService.edit({
            complaintId: new ObjectId(complaintId),
            complaint: complaintText,
            sicknessTimeDuration,
            reason,
            doctorId: doctor._id,
        });
        const complaintResponce = new ComplaintGraph({
            ...complaint,
        });
        return complaintResponce;
    }
}
