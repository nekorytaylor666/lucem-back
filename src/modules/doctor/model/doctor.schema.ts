export const doctorSchema = {
    name: 'doctor',
    fields: [
        { name: 'fullName', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'serviceIds', type: 'string[]', facet: true, optional: true },
        { name: '_id', type: 'string', optional: true },
        { name: 'phoneNumber', type: 'string' },
        { name: 'numberOfRatings', type: 'int32', optional: true },
        { name: 'sumOfRatings', type: 'int32', optional: true },
        { name: 'email', type: 'string' },
        { name: 'acceptableAgeGroup', type: 'string' },
        { name: 'num', type: 'int32' },
    ],
    default_sorting_field: 'num',
};
