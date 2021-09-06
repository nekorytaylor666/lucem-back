import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { TimelineResolver } from "./resolver/timeline.resolver";
import { TimelineService } from "./service/timeline.service";


@Module({
    imports: [MongoModule],
    providers: [TimelineResolver, TimelineService],
    exports: [TimelineService]
})
export class TimelineModule {}