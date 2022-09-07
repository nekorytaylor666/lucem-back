import { AppointmentInfo, AppointmentInfoResponse } from "./consultation-logic";

export const sortAppointmentsInfoBySessionId = (
    appointmentInfoRes: AppointmentInfoResponse,
) => {
    const { getComplaintsOfUser, getInspectionsOfUser, getDiagnoseOfUser } =
        appointmentInfoRes;

    const length = getComplaintsOfUser.length;
    const res = [];
    for (let index = 0; index < length; index++) {
        const complaint = getComplaintsOfUser[index];
        const inspection = getInspectionsOfUser[index];
        const diagnosis = getDiagnoseOfUser[index];
        res.push({
            complaint,
            inspection,
            diagnosis,
            sessionId: getComplaintsOfUser[index].session._id,
            date: getComplaintsOfUser[index].session.startDate,
            doctorFullName: getComplaintsOfUser[index].doctor.fullName,
        });
    }
    return res;
};
