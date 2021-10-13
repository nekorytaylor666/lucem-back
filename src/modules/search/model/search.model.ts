import { Field, ObjectType } from '@nestjs/graphql';
import { DeseaseGraph } from 'src/modules/deseases/model/desease.graph';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { Search } from './search.interface';

@ObjectType()
export class SearchGraph {
    @Field(() => [DoctorGraph], { nullable: true })
    doctors?: DoctorGraph[];

    @Field(() => [ServiceGraph], { nullable: true })
    services?: ServiceGraph[];

    @Field(() => [DeseaseGraph], { nullable: true })
    deseases?: DeseaseGraph[];

    constructor(search: Partial<Search>) {
        if (search.doctors)
            this.doctors = search.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
        if (search.services)
            this.services = search.services.map(
                (val) => new ServiceGraph({ ...val }),
            );
        if (search.deseases)
            this.deseases = search.deseases.map(
                (val) => new DeseaseGraph({ ...val }),
            );
    }
}
