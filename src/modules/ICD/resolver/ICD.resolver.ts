import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { ICDGraph } from '../model/ICD.model';
import { ICDService } from '../service/ICD.service';

@Resolver()
export class ICDResolver {
    constructor(private icdService: ICDService) {}

    @Query(() => [ICDGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async searchICD(@Args('query', { type: () => String }) query: string) {
        const ICDs = await this.icdService.search(query);
        const ICDsResponce = ICDs.map((val) => new ICDGraph({ ...val }));
        return ICDsResponce;
    }
}
