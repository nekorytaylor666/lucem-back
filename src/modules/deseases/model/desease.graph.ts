import { Field, ObjectType } from '@nestjs/graphql';
import { Desease } from './desease.interface';
import { Modify } from '../../../utils/modifyType';

@ObjectType('Desease')
export class DeseaseGraph implements Modify<Desease, { _id: string }> {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    name: string;

    constructor(desease: Partial<Desease>) {
        if (desease.name) this.name = desease.name;
        if (desease._id) this._id = desease._id.toHexString();
    }
}
