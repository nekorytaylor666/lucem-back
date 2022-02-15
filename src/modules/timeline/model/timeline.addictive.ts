import { BookingAddictive } from 'src/modules/booking/model/booking.addictive';
import { Timeline } from './timeline.interface';

export interface TimelineAddictive extends Timeline {
    booking?: BookingAddictive[];
}
