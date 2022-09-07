import { useRecoilState } from "recoil";

import { SpecializationList } from "@recoil/atoms/";
import { Specialization } from "custom_typings/specialization";

export const useAllSpecializations: () => [
    Specialization[],
    {
        setSpecializations: (specializationsList: Specialization[]) => void;
    },
] = () => {
    const [specializationsList, setAllSpecializations] =
        useRecoilState(SpecializationList);

    const setSpecializations = (specializationsList: Specialization[]) => {
        setAllSpecializations(specializationsList);
    };

    return [
        specializationsList,
        {
            setSpecializations,
        },
    ];
};
