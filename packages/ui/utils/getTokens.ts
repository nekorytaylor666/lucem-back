export const getDoctorTokens = () => {
    if (typeof window === "undefined") {
        return {
            token: null,
            doctorId: null,
            error: "Can not get token in server side",
        };
    }
    const token = localStorage.getItem("DOCTOR_TOKEN");
    const doctorId = localStorage.getItem("DOCTOR_ID");

    return {
        token,
        doctorId,
        error: null,
    };
};
