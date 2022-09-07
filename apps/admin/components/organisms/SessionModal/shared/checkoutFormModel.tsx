export const checkoutFormModel = {
    formId: "sessionForm",
    formField: {
        generalReview: {
            reviews: [],
        },
        illnessReason: {
            issues: {
                name: "illnessReason.issues",
            },
            illnesTimeLength: {
                amount: {
                    name: "illnessReason.illnesTimeLength.amount",
                },
                period: {
                    name: "illnessReason.illnesTimeLength.period",
                },
            },
            reason: {
                name: "illnessReason.reason",
            },
        },
        diagnoses: {
            diagnoseType: {
                name: "diagnoses.diagnoseType",
            },
            mkb: {
                name: "diagnoses.mkb",
            },
            fullIllnessDescription: {
                name: "diagnoses.fullIllnessDescription",
            },
            illnessCharacteristics: {
                name: "diagnoses.illnessCharacteristics",
            },
        },
        researchResult: {
            description: {
                name: "researchResult.description",
            },
        },
        references: {},
        curingPlan: {},
    },
};

export type sessionFormModelType = typeof checkoutFormModel.formField;
