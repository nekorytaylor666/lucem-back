import { Modify } from 'src/utils/modifyType';
import { Desease } from './desease.interface';

export const deaseaseShema = {
    name: 'desease',
    fields: [
        { name: '_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'num', type: 'int32' },
    ],
    default_sorting_field: 'num',
};

export interface DeseaseSearch
    extends Modify<
        Desease,
        {
            _id: string;
        }
    > {
    num: number;
}
