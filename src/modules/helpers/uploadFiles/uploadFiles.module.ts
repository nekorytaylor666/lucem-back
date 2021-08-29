import { Module } from "@nestjs/common";
import { AWSModule } from "./aws/AWS.module";
import { AWSservice } from "./aws/AWS.service";




@Module({ 
    imports: [AWSModule],
    exports: [AWSModule]
})
export class uploadFileModule {}