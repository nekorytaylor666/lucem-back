import { Desease } from "src/modules/deseases/model/desease.interface";
import { Service } from "src/modules/service/model/service.interface";
import { Timeline } from "src/modules/timeline/model/timeline.interface";
import { Doctor } from "./doctor.interface";
 
 
export interface DoctorAddictives extends Doctor {
    deseases?: Desease[];
    service?: Service[];
    rating?: number;
    timeline?: Timeline[];
}