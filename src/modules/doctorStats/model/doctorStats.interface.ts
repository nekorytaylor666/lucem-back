import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';

export interface DoctorSpecStats {
    specialization?: Specialization;
    doctor: Doctor;
    totalMoneyEarnt: number;
    totalNumOfSessions: number;
}
