import { Module } from "@nestjs/common";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { TimelineResolver, TimelineResolverDoctor } from "./resolver/timeline.resolver";
import { TimelineService } from "./service/timeline.service";


@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [TimelineResolver, TimelineService, TimelineResolverDoctor],
    exports: [TimelineService]
})
export class TimelineModule {}