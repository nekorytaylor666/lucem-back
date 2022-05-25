export const ICDSchema = {
    name: 'ICD',
    fields: [
        { name: 'code', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'num', type: 'int32' },
    ],
    default_sorting_field: 'num',
};

export interface ICD {
    code: string;
    description: string;
}
