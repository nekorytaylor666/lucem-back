import { Specialization } from 'src/modules/specialization/model/specialization.interface';

export interface SpecializationStats {
    individualSpecialistNum: number;
    totalNumSessions: number;
    totalMoneyEarnt: number;
    specialization: Specialization;
}
