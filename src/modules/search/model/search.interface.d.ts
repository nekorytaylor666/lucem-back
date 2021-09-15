import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from 'src/modules/service/model/service.interface';

export interface Search {
    doctors?: Partial<Doctor>[];
    services?: Partial<Service>[];
}
