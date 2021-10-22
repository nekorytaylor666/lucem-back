import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SearchGraph } from '../model/search.model';
import { SearchService } from '../service/search.service';

@Resolver()
export class SearchResolver {
    constructor(private searchService: SearchService) {}

    @Query(() => SearchGraph)
    async search(
        @Args('searchQuery', { type: () => String}) searchQuery: string
    ) {
        const searchResult = await this.searchService.search(searchQuery);
        const searchResponce = new SearchGraph({...searchResult})
        return searchResponce;
    }

    @Mutation(() => String)
    async addAllToSearch() {
        await this.searchService.addAll();
        return 'success';
    }
}
