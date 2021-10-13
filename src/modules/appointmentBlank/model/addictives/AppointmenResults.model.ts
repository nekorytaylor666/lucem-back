import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { PhotoURL } from "src/modules/helpers/uploadFiles/imageUpload/photoURL.interface";
import { PhotoURLGraph } from "src/modules/helpers/uploadFiles/imageUpload/photoURL.model";
import { Modify } from "src/utils/modifyType";


export interface AppointmentResults {
    photoURL: PhotoURL;
    description: string;
};

@InputType()
export class CreateAppointmentResults {
    @Field(() => GraphQLUpload, {
        name: 'file'
    })
    file: Promise<FileUpload>;

    @Field()
    description: string;
}

@ObjectType('AppointmentResults')
export class AppointmentResultsGraph implements Modify<AppointmentResults, {
    photoURL: PhotoURLGraph
}> {
    @Field(() => PhotoURLGraph)
    photoURL: PhotoURLGraph;

    @Field()
    description: string

    constructor(appointmentResults: Partial<AppointmentResults>) {
        if (appointmentResults.description) this.description = appointmentResults.description;
        if (appointmentResults.photoURL) this.photoURL = new PhotoURLGraph({...appointmentResults.photoURL});
    }
}