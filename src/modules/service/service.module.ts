import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { ServiceResolver } from "./resolver/service.resolver";
import { ServiceService } from "./service/service.service";


@Module({ 
    imports: [MongoModule],
    providers: [ServiceService, ServiceResolver],
    exports: [ServiceService]
})
export class ServiceModule {}