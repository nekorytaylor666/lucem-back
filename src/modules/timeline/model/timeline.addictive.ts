import { BookingAddictive } from 'src/modules/booking/model/booking.addictive';
import { Booking } from 'src/modules/booking/model/booking.interface';
import { DoctorAddictives } from 'src/modules/doctor/model/doctor.addictives';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Timeline } from './timeline.interface';

export interface TimelineAddictive extends Timeline {
    booking?: BookingAddictive[];
}
