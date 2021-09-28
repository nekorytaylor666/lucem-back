import { Field, ObjectType } from "@nestjs/graphql";
import { DoctorGraph } from "src/modules/doctor/model/doctor.model";
import { Modify } from "src/utils/modifyType";
import { ServiceAddictive } from "./service.addictive";
import { Service } from "./service.interface";


@ObjectType('Service')
export class ServiceGraph implements Modify<Service, { _id: string }> {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field(() => [DoctorGraph], { nullable: true })
    doctors: DoctorGraph[]

    constructor(service: Partial<ServiceAddictive>) {
        if (service._id) this._id = service._id.toHexString();
        if (service.name) this.name = service.name;
        if (service.price) this.price = service.price;
        if (service.description) this.description = service.description;
        if (service.doctors) this.doctors = service.doctors.map((val) => new DoctorGraph({...val}))
    }
}