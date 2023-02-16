export const doctorSchema = {
    name: 'doctor',
    fields: [
        { name: 'fullName', type: 'string' },
        { name: 'description', type: 'string' },
        { name: '_id', type: 'string', optional: true },
        { name: 'phoneNumber', type: 'string' },
        { name: 'numberOfRatings', type: 'int32', optional: true },
        { name: 'sumOfRatings', type: 'int32', optional: true },
        { name: 'email', type: 'string' },
        { name: 'acceptableAgeGroup', type: 'string', optional: true },
        { name: 'num', type: 'int32' },
    ],
    default_sorting_field: 'num',
};
