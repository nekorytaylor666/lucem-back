import { Doctor } from "src/modules/doctor/model/doctor.interface";
import { Timeline } from "./timeline.interface";


export interface TimelineAddictive extends Timeline {
    doctor?: Doctor,
}