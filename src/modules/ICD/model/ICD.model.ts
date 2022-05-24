import { Field, ObjectType } from '@nestjs/graphql';
import { ICD } from './ICD.schema';

@ObjectType('ICD')
export class ICDGraph implements ICD {
    @Field()
    description: string;

    @Field()
    code: string;

    constructor(icd: ICD) {
        if (icd.code != null) this.code = icd.code;
        if (icd.description != null) this.description = icd.description;
    }
}
