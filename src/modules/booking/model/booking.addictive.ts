import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from 'src/modules/service/model/service.interface';
import { User } from 'src/modules/user/model/user.interface';
import { Booking } from './booking.interface';

export interface BookingAddictive
    extends Omit<Booking, 'serviceId' | 'timelineId' | 'userId'> {
    service?: Service;
    user?: User;
    doctor?: Doctor;
}
