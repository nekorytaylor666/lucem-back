import {
    getAppointmentInfoUser,
    getAppointmentInfoUser_getComplaintsOfUser,
    getAppointmentInfoUser_getDiagnoseOfUser,
    getAppointmentInfoUser_getInspectionsOfUser,
} from "@graphqlTypes/getAppointmentInfoUser";

export interface AppointmentInfo {
    complaint: getAppointmentInfoUser_getComplaintsOfUser;
    inspection: getAppointmentInfoUser_getInspectionsOfUser;
    diagnosis: getAppointmentInfoUser_getDiagnoseOfUser;
    sessionId: string;
    date: string;
    doctorFullName: string;
}

export const sortAppointmentsInfoBySessionId = (
    appointmentInfoRes: getAppointmentInfoUser,
) => {
    const { getComplaintsOfUser, getInspectionsOfUser, getDiagnoseOfUser } =
        appointmentInfoRes;

    const length = getComplaintsOfUser.length;
    const res: AppointmentInfo[] = [];
    for (let index = 0; index < length; index++) {
        const complaint = getComplaintsOfUser[index];
        const inspection = getInspectionsOfUser[index];
        const diagnosis = getDiagnoseOfUser[index];
        const appointmentInfo = {
            complaint,
            inspection,
            diagnosis,
            sessionId: getComplaintsOfUser[index].session?._id,
            date: getComplaintsOfUser[index].session?.startDate,
            doctorFullName: getComplaintsOfUser[index].doctor?.fullName,
        };
        res.push(appointmentInfo);
    }
    return res;
};
