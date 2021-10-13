import { Field, InputType, ObjectType } from "@nestjs/graphql";

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

@ObjectType('Diagnose')
export class DiagnoseGraph implements Diagnose {
    @Field(() => Boolean)
    preliminary: boolean;

    @Field()
    deseaseDBCode: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;

    constructor(diagnose: Partial<Diagnose>) {
        if (diagnose.preliminary != undefined) this.preliminary = diagnose.preliminary;
        if (diagnose.diagnose) this.diagnose = diagnose.diagnose;
        if (diagnose.natureOfTheDesease) this.natureOfTheDesease = diagnose.natureOfTheDesease;
        if (diagnose.deseaseDBCode) this.deseaseDBCode = diagnose.deseaseDBCode;
    }
}