import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Modify } from 'src/utils/modifyType';
import { ServiceAddictive } from './service.addictive';
import { Service } from './service.interface';

@ObjectType('Service')
export class ServiceGraph
    implements Omit<Modify<Service, { _id: string }>, 'specializationIds'>
{
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field(() => [DoctorGraph], { nullable: true })
    doctors: DoctorGraph[];

    @Field(() => Int, { nullable: true })
    durationInMinutes?: number;

    constructor(service: Partial<ServiceAddictive>) {
        if (service._id != null) this._id = service._id.toHexString();
        if (service.name != null) this.name = service.name;
        if (service.price != null) this.price = service.price;
        if (service.description != null) this.description = service.description;
        if (service.doctors != null)
            this.doctors = service.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
        if (service.durationInMinutes != null)
            this.durationInMinutes = service.durationInMinutes;
    }
}
