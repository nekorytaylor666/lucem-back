import { getDescription } from "graphql";
import { sessionFormModelType } from "./checkoutFormModel";
import { sessionFormInitialType } from "./initialValues";

export const sessionAdapterFormStateToPayload = (arg: any) => {
    const formState = { ...arg };
    if (formState.diagnose.__typename) {
        formState.diagnose = { ...formState.diagnose, __typename: undefined };
    }
    if (formState.diagnose.doctor) {
        formState.diagnose = {
            ...formState.diagnose,
            doctor: undefined,
        };
    }

    const { description, images, doctorId } = formState.inspections.data.map(
        (el) => el,
    )[formState.inspections.data.length - 1];
    const newInspection = {
        description,
        images,
        photoURL: [],
        doctorId,
    };

    formState.inspections.data = newInspection;
    if (formState.complaint.__typename) {
        formState.complaint = formState.complaint = {
            ...formState.complaint,
            __typename: undefined,
        };
    }
    if (formState.complaint.doctor) {
        formState.complaint = {
            ...formState.complaint,
            doctor: undefined,
        };
    }
    formState.diagnose.preliminary = Boolean(formState.diagnose.preliminary);

    return {
        ...formState,
    };
};
