import { Field, ObjectType } from '@nestjs/graphql';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { Modify } from 'src/utils/modifyType';
import { SpecializationAddictive } from './specialization.addictive';
import { Specialization } from './specialization.interface';
import { ColorCodeGradientGraph } from './utils/colorCode.model';

@ObjectType('Specialization')
export class SpecializationGraph
    implements
        Modify<
            Omit<Specialization, 'doctorIds'>,
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

    @Field(() => PhotoURLGraph, { nullable: true })
    photoURL: PhotoURLGraph;

    @Field(() => ColorCodeGradientGraph, { nullable: true })
    colorCodeGradient: ColorCodeGradientGraph;

    @Field(() => [DoctorGraph])
    doctors: DoctorGraph[];

    @Field(() => [ServiceGraph], { nullable: true })
    services: ServiceGraph[];

    constructor(specialization: Partial<SpecializationAddictive>) {
        if (specialization._id != null)
            this._id = specialization._id.toHexString();
        if (specialization.name != null) this.name = specialization.name;
        if (specialization.description != null)
            this.description = specialization.description;
        if (specialization.photoURL != null)
            this.photoURL = new PhotoURLGraph({ ...specialization.photoURL });
        if (specialization.doctors != null)
            this.doctors = specialization.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
        if (specialization.services != null)
            this.services = specialization.services.map(
                (val) => new ServiceGraph({ ...val }),
            );
        if (specialization.colorCodeGradient != null)
            this.colorCodeGradient = new ColorCodeGradientGraph({
                ...specialization.colorCodeGradient,
            });
    }
}
