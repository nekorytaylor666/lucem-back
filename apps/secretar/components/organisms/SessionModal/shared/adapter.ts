import { sessionFormModelType } from "./checkoutFormModel";
import { sessionFormInitialType } from "./initialValues";

export const sessionAdapterFormStateToPayload = (formState: any) => {
    return {
        ...formState,
    };
};
