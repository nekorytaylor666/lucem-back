import { Desease } from "src/modules/deseases/model/desease.interface";
import { Service } from "src/modules/service/model/service.interface";
 
 
export type DoctorAddictives = {
    deseases?: Desease[];
    service?: Service[];
}