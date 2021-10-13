import { Module } from "@nestjs/common";
import { SmartSearchModule } from "../helpers/smartSearch/search.module";
import { SearchResolver } from "./resolver/search.resolver";
import { SearchService } from "./service/search.service";


@Module({
    imports: [SmartSearchModule],
    providers: [SearchResolver, SearchService],
    exports: []
})
export class SearchModule {}