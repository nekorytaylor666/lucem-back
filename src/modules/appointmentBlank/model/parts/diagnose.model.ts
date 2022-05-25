import { Field, InputType, ObjectType } from '@nestjs/graphql';

export interface Diagnose {
    preliminary: boolean;
    deseaseDBCode?: string;
    diagnose: string;
    natureOfTheDesease: string;
}

@InputType()
export class CreateDiagnose {
    @Field(() => Boolean)
    preliminary: boolean;

    @Field({ nullable: true })
    deseaseDBCode?: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;
}

@InputType()
export class EditDiagnoseInput {
    @Field(() => Boolean, { nullable: true })
    preliminary?: boolean;

    @Field({ nullable: true })
    deseaseDBCode?: string;

    @Field({ nullable: true })
    diagnose?: string;

    @Field({ nullable: true })
    natureOfTheDesease?: string;
}

@ObjectType('Diagnose')
export class DiagnoseGraph implements Diagnose {
    @Field(() => Boolean)
    preliminary: boolean;

    @Field({ nullable: true })
    deseaseDBCode: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;

    constructor(diagnose: Partial<Diagnose>) {
        if (diagnose.preliminary != undefined)
            this.preliminary = diagnose.preliminary;
        if (diagnose.diagnose != null) this.diagnose = diagnose.diagnose;
        if (diagnose.natureOfTheDesease != null)
            this.natureOfTheDesease = diagnose.natureOfTheDesease;
        if (diagnose.deseaseDBCode != null)
            this.deseaseDBCode = diagnose.deseaseDBCode;
    }
}
