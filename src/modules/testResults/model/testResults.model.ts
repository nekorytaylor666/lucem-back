import { Field, ObjectType } from "@nestjs/graphql";
import { BookingGraph } from "src/modules/booking/model/booking.model";
import { PhotoURLGraph } from "src/modules/helpers/uploadFiles/imageUpload/photoURL.model";
import { UserGraph } from "src/modules/user/model/user.model";
import { Modify } from "src/utils/modifyType";
import { TestResultsAddictive } from "./testResults.addictive";
import { TestResults } from "./testResults.interface";


@ObjectType()
export class TestResultsGraph implements Modify<Omit<TestResults, "userId" | "bookingId">, {
    _id: string;
    photoURL: PhotoURLGraph[];
    date: string;
}>{
    @Field()
    _id: string;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field(() => BookingGraph, { nullable: true })
    booking: BookingGraph;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => [PhotoURLGraph])
    photoURL: PhotoURLGraph[];

    @Field()
    date: string;

    constructor(testResults: Partial<TestResultsAddictive>) {
        if (testResults._id) this._id = testResults._id.toHexString();
        if (testResults.date) this.date = testResults.date.toISOString();
        if (testResults.description) this.description = testResults.description;
        if (testResults.photoURL) this.photoURL = testResults.photoURL.map((val) => new PhotoURLGraph({...val}));
        if (testResults.booking) this.booking = new BookingGraph({...testResults.booking});
        if (testResults.title) this.title = testResults.title;
        if (testResults.user) this.user = new UserGraph({...testResults.user});
    }
}