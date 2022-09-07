import { useRecoilState } from "recoil";

import { AppointmentAtom } from "@recoil/atoms";

import { Doctor } from "custom_typings/doctor";
import { Appointment } from "custom_typings/appointment";
import { GetDoctorSearch_getAllDoctors } from "@graphqlTypes/GetDoctorSearch";

export const useAppointment: () => [
    Appointment,
    {
        setAppointmentDoctor: (doctor: GetDoctorSearch_getAllDoctors) => void;
        setTime: (time: { start: string; end: string }) => void;
        setShow: (show: boolean) => void;
    },
] = () => {
    const [appointmentData, setAppointmentData] =
        useRecoilState(AppointmentAtom);

    const setAppointmentDoctor = (doctor: GetDoctorSearch_getAllDoctors) => {
        setAppointmentData((prevState) => ({
            ...prevState,
            doctor: doctor,
        }));
    };
    const setTime = (time: { start: string; end: string }) => {
        setAppointmentData((prevState) => ({
            ...prevState,
            time: { start: time.start, end: time.end },
        }));
    };
    const setShow = (show: boolean) => {
        setAppointmentData((prevState) => ({
            ...prevState,
            show: show,
        }));
    };

    return [appointmentData, { setAppointmentDoctor, setTime, setShow }];
};
