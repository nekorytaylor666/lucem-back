import { Desease } from 'src/modules/deseases/model/desease.interface';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from 'src/modules/service/model/service.interface';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';

export interface Search {
    doctors?: Partial<Doctor>[];
    services?: Partial<Service>[];
    deseases?: Partial<Desease>[];
    specializations?: Partial<Specialization>[];
}
