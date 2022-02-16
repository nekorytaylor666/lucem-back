import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AllowedLanguages, AllowedLanguageTypes } from './language.enum';

export interface Language {
    language: AllowedLanguages;
    type: AllowedLanguageTypes;
}

@ObjectType()
export class LanguageGraph implements Language {
    @Field(() => AllowedLanguages)
    language: AllowedLanguages;

    @Field(() => AllowedLanguageTypes)
    type: AllowedLanguageTypes;

    constructor(args: Partial<Language>) {
        if (args.language != null) this.language = args.language;
        if (args.type != null) this.type = args.type;
    }
}

@InputType()
export class LanguageInput implements Language {
    @Field(() => AllowedLanguages)
    language: AllowedLanguages;

    @Field(() => AllowedLanguageTypes)
    type: AllowedLanguageTypes;
}
