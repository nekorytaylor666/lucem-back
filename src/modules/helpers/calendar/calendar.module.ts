import { Module } from '@nestjs/common';
import { CalendarService } from './service/calendar.service';

@Module({
    providers: [CalendarService],
    exports: [CalendarService],
})
export class CalendarModule {}
