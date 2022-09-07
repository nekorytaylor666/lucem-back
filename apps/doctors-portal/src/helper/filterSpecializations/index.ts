import { Specialization } from "custom_typings/specialization";

export const filterSpecializations = (
    specializationsList: Specialization[],
    name: string,
): Specialization[] => {
    const res = specializationsList.filter((specialization) => {
        return specialization.name == name;
    });
    return res;
};
