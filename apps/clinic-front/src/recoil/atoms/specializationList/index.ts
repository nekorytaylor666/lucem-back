import { atom } from "recoil";
import { Atoms } from "@recoil/constants";
import { Specialization } from "custom_typings/specialization";

export const SpecializationList = atom<Specialization[]>({
    key: Atoms.SpecializationList,
    default: [],
});
