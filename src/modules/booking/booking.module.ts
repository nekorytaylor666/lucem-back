import { CacheModule, Module } from "@nestjs/common";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { TimelineModule } from "../timeline/timeline.module";
import { BookingResolver } from "./resolver/booking.resolver";
import { BookingService } from "./service/booking.service";
import { HttpModule } from "@nestjs/axios"

@Module({
    imports: [MongoModule, PreAuthModule, TimelineModule],
    providers: [BookingResolver, BookingService],
    exports: []
})
export class BookingModule {}