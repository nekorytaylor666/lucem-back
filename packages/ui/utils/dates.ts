import { differenceInYears, parse } from "date-fns";

export const calculateAge = (dob: string | Date) => {
  const date = new Date(dob);
  const age = differenceInYears(new Date(), date);
  return age;
};
