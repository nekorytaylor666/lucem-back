import { ArgsType, Field } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Modify } from "src/utils/modifyType";
import { TestResults } from "./testResults.interface";



@ArgsType()
export class CreateTestResults implements Modify<Omit<TestResults, "_id" | "date" | "photoURL">, {
    userId: string,
    bookingId: string
}>{
    @Field()
    userId: string;

    @Field()
    bookingId: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => GraphQLUpload)
    files: Promise<FileUpload[]>;
}