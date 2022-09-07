import { PatientEntity } from "@core/types/patient/IPatient";
import { ConsultSessionEntity } from "@core/types/session/ISession";
import { SerializableParam } from "recoil";
import { atom, selectorFamily } from "recoil";

export const patientsState = atom<PatientEntity[]>({
    key: "patientsState",
    default: [],
});

export const patientSelector = selectorFamily({
    key: "patientSelector",
    get:
        (patientId) =>
        ({ get }) => {
            const patients = get(patientsState);
            return (
                patients.find((patient) => patient._id === patientId) ??
                ({} as any)
            );
        },
});
