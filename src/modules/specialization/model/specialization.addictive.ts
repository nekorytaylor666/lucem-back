import { Doctor } from "src/modules/doctor/model/doctor.interface";
import { Specialization } from "./specialization.interface";


export interface SpecializationAddictive extends Specialization {
    doctors: Doctor[]
}