import { atom } from "recoil";

import { Atoms } from "@recoil/constants";

import { Appointment } from "custom_typings/appointment";

export const AppointmentAtom = atom<Appointment>({
    key: Atoms.Appointment,
    default: {
        doctor: {
            _id: "",
            fullName: "",
            avatar: {
                m: "",
                xl: "",
                thumbnail: "",
            },
            deseases: [""],
            acceptableAgeGroup: "Both",
            dateOfBirth: "",
            description: "",
            email: "",
            numOfRatings: 0,
            phoneNumber: "",
            rating: 0,
            yearsOfExperience: 0,
        },
        time: {
            start: "",
            end: "",
        },
        show: false,
    },
});
