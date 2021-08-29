import { CanActivate, createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/modules/user/service/user.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class PreAuthGuardUser implements CanActivate {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext().req;
    const { authorization } = request.headers;
    const graphqlRequestName =
      GqlExecutionContext.create(context).getInfo().path.key;
    if (
      graphqlRequestName === 'registerUser' ||
      graphqlRequestName === 'loginUser'
    )
      return true;
    if (!authorization) return false;
    try {
      const payload = this.tokenService.verify({ token: authorization });
      const user = this.userService.findOne({ _id: payload._id });
      if (!user) return false;
      request.user = user;
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

