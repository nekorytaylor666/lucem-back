import { ArgsType, Field } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Modify } from "src/utils/modifyType";
import { Specialization } from "./specialization.interface";


@ArgsType()
export class CreateSpecialization implements Omit<Specialization, "_id" | "photoURL">{
    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => GraphQLUpload, {
        name: 'image',
        nullable: true,
    })
    image: Promise<FileUpload>;
}