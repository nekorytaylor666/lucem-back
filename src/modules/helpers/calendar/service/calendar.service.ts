import { Injectable } from '@nestjs/common';
import ical, {
    ICalRepeatingOptions,
    ICalEventRepeatingFreq,
} from 'ical-generator';

@Injectable()
export class CalendarService {
    createEvent(args: {
        eventName: string;
        startDate: Date;
        endDate: Date;
        summary: string;
        description: string;
        location?: string;
        url?: string;
        organizer?: {
            name: string;
            email: string;
        };
        timezone: string;
        repeating?: string[];
        freq?: string;
    }) {
        const {
            startDate,
            endDate,
            summary,
            description,
            location,
            url,
            organizer,
            timezone,
            eventName,
            repeating,
            freq,
        } = args;
        const cal = ical({ name: eventName });
        const event = cal.createEvent({
            start: startDate,
            end: endDate,
            summary,
            description,
            location,
            url,
            organizer,
            timezone,
        });
        repeating &&
            event.repeating({
                freq,
                byDay: repeating,
            });
        return cal;
    }
}
