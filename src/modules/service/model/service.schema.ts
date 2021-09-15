import { Modify } from 'src/utils/modifyType';
import { Service } from './service.interface';

export const serviceSchema = {
    name: 'service',
    fields: [
        { name: '_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'price', type: 'int32' },
        { name: 'description', type: 'string' },
    ],
    default_sorting_field: 'price',
};

export interface ServiceSearch
    extends Modify<
        Service,
        {
            _id: string;
        }
    > {}
