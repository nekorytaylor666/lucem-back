import { Field, ObjectType } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { Service } from "./service.interface";


@ObjectType()
export class ServiceGraph implements Modify<Service, { _id: string }> {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    constructor(service: Partial<Service>) {
        if (service._id) this._id = service._id.toHexString();
        if (service.name) this.name = service.name;
        if (service.price) this.price = service.price;
        if (service.description) this.description = service.description;
    }
}