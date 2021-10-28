import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from 'src/modules/service/model/service.interface';
import { Specialization } from './specialization.interface';

export interface SpecializationAddictive extends Specialization {
    doctors: Doctor[];
    services: Service[];
}
