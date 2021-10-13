import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { SmartSearchModule } from "../helpers/smartSearch/search.module";
import { ServiceResolver } from "./resolver/service.resolver";
import { ServiceService } from "./service/service.service";


@Module({ 
    imports: [MongoModule, SmartSearchModule],
    providers: [ServiceService, ServiceResolver],
    exports: [ServiceService]
})
export class ServiceModule {}