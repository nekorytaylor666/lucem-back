import { Field, ObjectType } from '@nestjs/graphql';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { Search } from './search.interface';

@ObjectType()
export class SearchGraph {
    @Field(() => [DoctorGraph], { nullable: true })
    doctors: DoctorGraph[];

    @Field(() => [ServiceGraph], { nullable: true })
    services: ServiceGraph[];

    constructor(search: Partial<Search>) {
        if (search.doctors)
            this.doctors = search.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
        if (search.services)
            this.services = search.services.map(
                (val) => new ServiceGraph({ ...val }),
            );
    }
}
