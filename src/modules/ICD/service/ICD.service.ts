import { Inject, Injectable } from '@nestjs/common';
import { ICD } from '../model/ICD.schema';

@Injectable()
export class ICDService {
    constructor(@Inject('SMARTSEARCH_CONNECTION') private searchClient) {}

    private get ICDCollection() {
        return this.searchClient.collections('ICD').documents();
    }

    async addICD(args: ICD) {
        await this.ICDCollection.create(args);
    }

    async search(q: string) {
        const searchQuery = {
            q,
            query_by: 'description',
        };
        const ICDResponce = await this.ICDCollection.search(searchQuery);
        const ICD: ICD[] = ICDResponce.hits.map((val) => val.document);
        return ICD;
    }
}
