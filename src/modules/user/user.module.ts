import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { TokenModule } from '../helpers/token/token.module';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
  imports: [ConfigModule, MongoModule, TokenModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
