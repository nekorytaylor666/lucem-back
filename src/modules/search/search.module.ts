import { Module } from "@nestjs/common";
import { DeseasesModule } from "../deseases/deseases.module";
import { DoctorModule } from "../doctor/doctor.module";
import { SmartSearchModule } from "../helpers/smartSearch/search.module";
import { ServiceModule } from "../service/service.module";
import { SearchResolver } from "./resolver/search.resolver";
import { SearchService } from "./service/search.service";


@Module({
    imports: [SmartSearchModule, DoctorModule, DeseasesModule, ServiceModule],
    providers: [SearchResolver, SearchService],
    exports: []
})
export class SearchModule {}