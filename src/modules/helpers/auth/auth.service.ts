import {
    CanActivate,
    createParamDecorator,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Collection, ObjectId } from 'mongodb';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { UserService } from 'src/modules/user/service/user.service';
import { matchRoles } from 'src/utils/matchRoles';
import { TokenService } from '../token/token.service';

@Injectable()
export class PreAuthGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private userService: UserService,
        private reflector: Reflector,
        private doctorService: DoctorService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = GqlExecutionContext.create(context).getContext().req;
        const { authorization } = request.headers;
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        request.requestURL = `${request.protocol}://${request.rawHeaders[1]}`
        if (roles[0] === 'none') return true;
        if (!authorization) return false;
        try {
            const payload = this.tokenService.verify({ token: authorization });
            const checkRoles = matchRoles(payload.role, roles);
            if (!checkRoles) return false;
            let dbService: UserService | DoctorService = this.userService;
            if (payload.role === 'doctor') dbService = this.doctorService
            const user = await dbService.findOne({
                _id: new ObjectId(payload._id),
            });
            if (!user) return false;
            request.user = user;

            return true;
        } catch {
            return false;
        }
    }
}


export const CurrentUserGraph = createParamDecorator(
    async (data: unknown, context: ExecutionContext) => {
        const request = GqlExecutionContext.create(context).getContext().req;
        return request.user;
    },
);

export const CurrentRequestURLGraph = createParamDecorator(
    async (data: unknown, context: ExecutionContext) => {
        const request = GqlExecutionContext.create(context).getContext().req;
        return request.requestURL;
    },
);