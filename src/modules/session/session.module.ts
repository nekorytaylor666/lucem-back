import { Module } from "@nestjs/common";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { SessionResolver } from "./resolver/session.resolver";
import { SessionService } from "./service/session.service";


@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [SessionService, SessionResolver],
    exports: [SessionService]
})
export class SessionModule {}