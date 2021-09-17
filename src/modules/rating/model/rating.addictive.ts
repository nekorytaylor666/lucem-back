import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { User } from 'src/modules/user/model/user.interface';
import { Rating } from './rating.interface';

export interface RatingAddictive extends Omit<Rating, 'userId' | 'doctorId'> {
    user: User;
    doctor: Doctor;
}
