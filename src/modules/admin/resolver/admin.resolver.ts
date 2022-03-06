import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { AdminGraph } from '../model/admin.model';
import { CreateAdmin } from '../model/createAdmin.args';
import { EditAdmin } from '../model/editAdmin.args';
import { AdminService } from '../service/admin.service';

@Resolver()
export class AdminResolver {
    constructor(private adminService: AdminService) {}

    @Mutation(() => AdminGraph)
    async registerAdmin(@Args() args: CreateAdmin) {
        const createAdmin = await this.adminService.createAdmin(args);
        const adminResponce = new AdminGraph({ ...createAdmin });
        return adminResponce;
    }

    @Query(() => AdminGraph)
    async loginAdmin(
        @Args('email', { nullable: true, type: () => String }) email: string,
        @Args('phoneNumber', { nullable: true, type: () => String })
        phoneNumber: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const admin = await this.adminService.login({
            email,
            phoneNumber,
            password,
        });
        const adminResponce = new AdminGraph({ ...admin });
        return adminResponce;
    }

    @Mutation(() => AdminGraph)
    @Roles('admin')
    @UseGuards(PreAuthGuard)
    async editAdmin(
        @CurrentUserGraph() user: { _id: string },
        @Args() args: EditAdmin,
    ) {
        const updateAdmin = await this.adminService.edit({
            ...args,
            _id: new ObjectId(user._id),
        });
        const adminResponce = new AdminGraph({ ...updateAdmin });
        return adminResponce;
    }
}
