import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { mongodDbFactory } from "./mongo.provider";


@Module({
    imports: [ConfigModule],
    providers: [mongodDbFactory],
    exports: [mongodDbFactory]
})
export class MongoModule {};