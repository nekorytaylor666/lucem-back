import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { DoctorSearch } from "src/modules/doctor/model/doctor.schema";
import { Search } from "../model/search.interface";


@Injectable()
export class SearchService {
    constructor(@Inject('SMARTSEARCH_CONNECTION') private searchClient) {}

    private get searchDoctorCollection() {
        return this.searchClient.collections('doctor').documents();
    }

    async search(searchQuery: string) {
        const doctorSearchParameters = {
            q: searchQuery,
            query_by: 'fullName, description, email'
        }
        const doctorsResponce = await this.searchDoctorCollection.search(doctorSearchParameters);
        const doctors: DoctorSearch[] = doctorsResponce.hits.map((val) => val.document);
        console.log(doctors);
        const searchResponce: Search = {
            doctors: doctors.map((val) => {
                return {
                    ...val,
                    _id: new ObjectId(val._id),
                }
            })
        };
        return searchResponce;
    }
}