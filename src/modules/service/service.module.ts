import { Module } from "@nestjs/common";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { SmartSearchModule } from "../helpers/smartSearch/search.module";
import { ServiceResolver } from "./resolver/service.resolver";
import { ServiceService } from "./service/service.service";


@Module({ 
    imports: [MongoModule, SmartSearchModule, PreAuthModule],
    providers: [ServiceService, ServiceResolver],
    exports: [ServiceService]
})
export class ServiceModule {}