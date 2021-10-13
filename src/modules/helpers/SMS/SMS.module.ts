import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config";
import { SMSService } from "./SMS.service";


@Module({
    imports: [ConfigModule, HttpModule],
    providers: [SMSService],
    exports: [SMSService]
})
export class SMSModule {}