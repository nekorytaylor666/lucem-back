import { Field, ObjectType } from '@nestjs/graphql';
import { DeseaseGraph } from 'src/modules/deseases/model/desease.model';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { Search } from './search.interface';

@ObjectType()
export class SearchGraph {
    @Field(() => [DoctorGraph], { nullable: true })
    doctors?: DoctorGraph[];

    @Field(() => [ServiceGraph], { nullable: true })
    services?: ServiceGraph[];

    @Field(() => [DeseaseGraph], { nullable: true })
    deseases?: DeseaseGraph[];

    @Field(() => [SpecializationGraph], { nullable: true })
    specializations?: SpecializationGraph[];

    constructor(search: Partial<Search>) {
        if (search.specializations != null)
            this.specializations = search.specializations.map(
                (val) => new SpecializationGraph({ ...val }),
            );
        if (search.doctors != null)
            this.doctors = search.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
        if (search.services != null)
            this.services = search.services.map(
                (val) => new ServiceGraph({ ...val }),
            );
        if (search.deseases != null)
            this.deseases = search.deseases.map(
                (val) => new DeseaseGraph({ ...val }),
            );
    }
}
