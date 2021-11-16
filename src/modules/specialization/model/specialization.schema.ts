export const specializationSchema = {
    name: 'specialization',
    fields: [
        { name: '_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'num', type: 'int32' },
    ],
    default_sorting_field: 'num',
};
