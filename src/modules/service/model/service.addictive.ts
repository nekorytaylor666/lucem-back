import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { Service } from './service.interface';

export interface ServiceAddictive extends Service {
    doctors?: Doctor[];
    specializations?: Specialization[];
}
