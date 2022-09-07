import { checkoutFormModel } from "./checkoutFormModel";
export interface SessionFormComponentProps {
  label?: string;
  formField: typeof checkoutFormModel.formField;
}

export type SessionFormValuesObject = typeof checkoutFormModel.formField;
