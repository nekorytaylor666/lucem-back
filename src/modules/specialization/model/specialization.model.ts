import { Field, ObjectType } from '@nestjs/graphql';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { Modify } from 'src/utils/modifyType';
import { SpecializationAddictive } from './specialization.addictive';
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

    @Field(() => [DoctorGraph])
    doctors: DoctorGraph[];

    constructor(specialization: Partial<SpecializationAddictive>) {
        if (specialization._id) this._id = specialization._id;
        if (specialization.name) this.name = specialization.name;
        if (specialization.description)
            this.description = specialization.description;
        if (specialization.photoURL)
            this.photoURL = new PhotoURLGraph({ ...specialization.photoURL });
        if (specialization.doctors)
            this.doctors = specialization.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
    }
}
