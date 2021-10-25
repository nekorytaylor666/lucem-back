import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from './service.interface';

export interface ServiceAddictive extends Service {
    doctors?: Doctor[];
}
