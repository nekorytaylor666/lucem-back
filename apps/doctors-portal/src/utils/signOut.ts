export const signOut = () => {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.removeItem("DOCTOR_TOKEN");
    localStorage.removeItem("DOCTOR_ID");
    window.location.href = "/login";
};
