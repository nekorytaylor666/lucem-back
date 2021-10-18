import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";


@Module({
    imports: [MongoModule, ],
    providers: [],
    exports: []
})
export class NotificationsModule {}