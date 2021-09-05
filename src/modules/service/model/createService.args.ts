import { ArgsType, Field } from "@nestjs/graphql";
import { Service } from "./service.interface";



@ArgsType()
export class CreateService implements Omit<Service, "_id"> {
    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;
}