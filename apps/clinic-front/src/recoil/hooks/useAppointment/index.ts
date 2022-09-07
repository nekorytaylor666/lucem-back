import { useRecoilState } from "recoil";

import { AppointmentAtom } from "@recoil/atoms";

import { Doctor } from "custom_typings/doctor";
import { Appointment } from "custom_typings/appointment";
import { GetDoctorByID_getDoctorByID } from "@graphqlTypes/GetDoctorByID";

export const useAppointment: () => [
    Appointment,
    {
        setAppointmentDoctor: (doctor: GetDoctorByID_getDoctorByID) => void;
        setTime: (time: { start: string; end: string }) => void;
        setShow: (show: boolean) => void;
    },
] = () => {
    const [appointmentData, setAppointmentData] =
        useRecoilState(AppointmentAtom);

    const setAppointmentDoctor = (doctor: GetDoctorByID_getDoctorByID) => {
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
