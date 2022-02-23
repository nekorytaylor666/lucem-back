import { Injectable } from '@nestjs/common';
import ical from 'ical-generator';

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
        } = args;
        const cal = ical({ name: eventName });
        cal.createEvent({
            start: startDate,
            end: endDate,
            summary,
            description,
            location,
            url,
            organizer,
            timezone,
        });
        return cal;
    }
}
