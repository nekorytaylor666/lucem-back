import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PreAuthGuardUser } from 'src/modules/helpers/auth/auth.service';
import { CreateUser } from '../model/createUser.args';
import { UserGraph } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver()
@UseGuards(PreAuthGuardUser)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserGraph)
  async registerUser(@Args() args: CreateUser) {
    
  }

  @Query(() => String)
  async helloWorld() {
    return "hello world"
  }



  
}
