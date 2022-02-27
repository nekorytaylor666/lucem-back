import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DeseaseSearch } from 'src/modules/deseases/model/desease.shema';
import { DeseaseService } from 'src/modules/deseases/service/desease.service';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { ServiceSearch } from 'src/modules/service/model/service.schema';
import { ServiceService } from 'src/modules/service/service/service.service';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { SpecializationService } from 'src/modules/specialization/service/specialization.service';
import { Modify } from 'src/utils/modifyType';
import { Search } from '../model/search.interface';

@Injectable()
export class SearchService {
    constructor(
        @Inject('SMARTSEARCH_CONNECTION') private searchClient,
        private doctorService: DoctorService,
        private serviceService: ServiceService,
        private deseaseService: DeseaseService,
        private specializationService: SpecializationService,
    ) {}

    private get searchDoctorCollection() {
        return this.searchClient.collections('doctor').documents();
    }

    private get searchServiceCollection() {
        return this.searchClient.collections('service').documents();
    }

    private get searchSpecializationCollection() {
        return this.searchClient.collections('specialization').documents();
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
        const doctors: Modify<Doctor, { _id: string }>[] =
            doctorsResponce.hits.map((val) => val.document);
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
        const specializationSearchParameters = {
            q: searchQuery,
            query_by: 'name, description',
        };
        const specializationResponce =
            await this.searchSpecializationCollection.search(
                specializationSearchParameters,
            );
        const specialization: (Pick<
            Modify<Specialization, { _id: string }>,
            '_id' | 'description' | 'name'
        > & { num: number })[] = specializationResponce.hits.map(
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
            specializations: specialization.map((val) => {
                return {
                    ...val,
                    _id: new ObjectId(val._id),
                };
            }),
        };
        return searchResponce;
    }

    async addAll() {
        const services = await this.serviceService.list();
        const doctors = await this.doctorService.list();
        const deseases = await this.deseaseService.list();
        const specializations = await this.specializationService.list();
        services.map((val) =>
            this.searchServiceCollection.create({
                ...val,
                _id: val._id.toHexString(),
            } as ServiceSearch),
        );
        specializations.map((val) => {
            this.searchSpecializationCollection.create({
                ...val,
                _id: val._id.toHexString(),
                num: 1,
            });
        });
        doctors.map((val) =>
            this.searchDoctorCollection.create({
                ...val,
                _id: val._id.toHexString(),
                num: 1,
            } as Modify<Doctor, { _id: string }>),
        );
        deseases.map((val) =>
            this.searchDeseaseCollection.create({
                ...val,
                num: 1,
                _id: val._id.toHexString(),
            } as DeseaseSearch),
        );
    }
}
