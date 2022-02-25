import { Field, ObjectType } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Secretary } from './secretary.interface';

@ObjectType('Secretary')
export class SecretaryGraph
    implements
        Modify<
            Omit<Secretary, 'passwordHASH'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    constructor(args: Partial<Secretary>) {
        if (args._id != null) this._id = args._id.toHexString();
        if (args.email != null) this.email = args.email;
        if (args.fullName != null) this.fullName = args.fullName;
        if (args.phoneNumber != null) this.phoneNumber = args.phoneNumber;
    }
}

@ObjectType('TokenSecretary')
export class TokenSecretaryGraph {
    @Field()
    token: string;

    @Field(() => SecretaryGraph)
    secretary: SecretaryGraph;

    constructor(args: { token: string; secretary: Secretary }) {
        if (args.token != null) this.token = args.token;
        if (args.secretary != null)
            this.secretary = new SecretaryGraph({ ...args.secretary });
    }
}
