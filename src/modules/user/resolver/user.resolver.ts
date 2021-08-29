import { Resolver } from '@nestjs/graphql';
import { UserService } from '../service/user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  
}
