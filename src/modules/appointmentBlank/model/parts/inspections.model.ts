import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ObjectId } from 'mongodb';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';

export interface Inspections {
    _id: ObjectId;
    description?: string;
    images?: PhotoURL[];
}

@InputType()
export class InspectionsDataInput {
    @Field({ nullable: true })
    description?: string;

    @Field(() => [GraphQLUpload], { nullable: true })
    images?: Promise<FileUpload[]>;
}

@InputType()
export class CreateInspections {
    @Field(() => [InspectionsDataInput])
    data: InspectionsDataInput[];
}

@ObjectType('Inspections')
export class InspectionsGraph {
    @Field()
    _id: string;
    @Field({ nullable: true })
    description?: string;
    @Field(() => [PhotoURLGraph])
    images?: PhotoURLGraph[];

    constructor(inspections: Partial<Inspections>) {
        if (inspections._id != null) this._id = inspections._id.toHexString();
        if (inspections.description != null)
            this.description = inspections.description;
        if (inspections.images != null)
            this.images = inspections.images.map(
                (val) => new PhotoURLGraph({ ...val }),
            );
    }
}
