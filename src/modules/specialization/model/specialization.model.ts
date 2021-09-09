import { Field, ObjectType } from '@nestjs/graphql';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { Modify } from 'src/utils/modifyType';
import { Specialization } from './specialization.interface';

@ObjectType()
export class SpecializationGraph
    implements
        Modify<
            Specialization,
            {
                _id: string;
                photoURL: PhotoURLGraph;
            }
        >
{
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => PhotoURLGraph)
    photoURL: PhotoURLGraph;

    constructor(specialization: Partial<Specialization>) {
        if (specialization._id) this._id = specialization._id;
        if (specialization.name) this.name = specialization.name;
        if (specialization.description)
            this.description = specialization.description;
        if (specialization.photoURL)
            this.photoURL = new PhotoURLGraph({ ...specialization.photoURL });
    }
}
