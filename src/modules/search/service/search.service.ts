import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Desease } from 'src/modules/deseases/model/desease.interface';
import { DeseaseSearch } from 'src/modules/deseases/model/desease.shema';
import { DoctorSearch } from 'src/modules/doctor/model/doctor.schema';
import { ServiceSearch } from 'src/modules/service/model/service.schema';
import { Search } from '../model/search.interface';

@Injectable()
export class SearchService {
    constructor(@Inject('SMARTSEARCH_CONNECTION') private searchClient) {}

    private get searchDoctorCollection() {
        return this.searchClient.collections('doctor').documents();
    }

    private get searchServiceCollection() {
        return this.searchClient.collections('service').documents();
    }

    private get searchDeseaseCollection() {
        return this.searchClient.collections('desease').documents();
    }

    async search(searchQuery: string) {
        const doctorSearchParameters = {
            q: searchQuery,
            query_by: 'fullName, description, email',
        };
        const doctorsResponce = await this.searchDoctorCollection.search(
            doctorSearchParameters,
        );
        const doctors: DoctorSearch[] = doctorsResponce.hits.map(
            (val) => val.document,
        );
        const serviceSearchParameters = {
            q: searchQuery,
            query_by: 'name, description',
        };
        const serviceResponce = await this.searchServiceCollection.search(
            serviceSearchParameters,
        );
        const services: ServiceSearch[] = serviceResponce.hits.map(
            (val) => val.document,
        );
        const deseaseSearchParameters = {
            q: searchQuery,
            query_by: 'name',
        };
        const deseaseResponce = await this.searchDeseaseCollection.search(
            deseaseSearchParameters,
        );
        const deseases: DeseaseSearch[] = deseaseResponce.hits.map(
            (val) => val.document,
        );
        const searchResponce: Search = {
            doctors: doctors.map((val) => {
                return {
                    ...val,
                    _id: new ObjectId(val._id),
                };
            }),
            services: services.map((val) => {
                return {
                    ...val,
                    _id: new ObjectId(val._id),
                };
            }),
            deseases: deseases.map((val) => {
                return {
                    ...val,
                    _id: new ObjectId(val._id),
                };
            }),
        };
        return searchResponce;
    }
}
