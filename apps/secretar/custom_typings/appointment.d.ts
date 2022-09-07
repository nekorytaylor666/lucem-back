export interface Appointment {
    doctor: Doctor;
    time: {
        start: string;
        end: string;
    };
    show: boolean;
}
