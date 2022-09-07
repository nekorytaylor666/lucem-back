import { sessionFormModelType } from "./checkoutFormModel";
import { sessionFormInitialType } from "./initialValues";

export const sessionAdapterFormStateToPayload = (
    formState: sessionFormInitialType,
) => {
    const illnessTimelength = formState.illnessReason.illnesTimeLength;
    const { amount, period } = illnessTimelength;
    const sicknessTimeDuration = `${amount}-${period}`;
    const inspections = formState.generalReview.reviews.map(
        (el: any) => el.description as string,
    );

    const diagnose = {
        deseaseDBCode: formState.diagnoses.mkb,
        diagnose: formState.diagnoses.fullIllnessDescription,
        natureOfTheDesease: formState.diagnoses.illnessCharacteristics,
        preliminary:
            formState.diagnoses.diagnoseType === "preview" ? true : false,
    };
    const complaints = {
        complaint: formState.illnessReason.issues,
        reason: formState.illnessReason.reason,
        sicknessTimeDuration,
    };
    const appointmentResults = {
        description: formState.researchResult.description,
    };
    return {
        inspections,
        diagnose,
        complaints,
        appointmentResults,
    };
};
