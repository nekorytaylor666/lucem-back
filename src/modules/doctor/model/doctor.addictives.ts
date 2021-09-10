import { Desease } from "src/modules/deseases/model/desease.interface";
import { Service } from "src/modules/service/model/service.interface";
import { Doctor } from "./doctor.interface";
 
 
export interface DoctorAddictives extends Doctor {
    deseases?: Desease[];
    service?: Service[];
    rating?: number;
    numOfRatings?: number;
}