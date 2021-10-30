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
import { ComplaintGraph } from '../../model/parts/complaint.model';
import { ComplaintService } from '../../service/parts/complaint.service';

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
                ? await this.complaintService.findWithAddictives({
                      doctorId: user._id,
                  })
                : await this.complaintService.findWithAddictives({
                      doctorId: new ObjectId(doctorId),
                  });
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
                ? await this.complaintService.findWithAddictives({
                      userId: user._id,
                  })
                : await this.complaintService.findWithAddictives({
                      userId: new ObjectId(userId),
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
}
