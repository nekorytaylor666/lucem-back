import { Doctor } from "./doctor";
import { Service } from "./service";
import { User } from "./user";

type BookingProgress = "Canceled" | "Done" | "Ongoing" | "Upcoming";

export interface Booking {
    _id: string;
    doctor: Doctor;
    endDate: string;
    startDate: string;
    progress: BookingProgress;
    service: Service;
    user: User;
}
