import { ObjectId } from 'mongodb';
import { AppointmentResults } from './addictives/AppointmenResults.model';
import { Complaint } from './addictives/complaint.model';
import { Diagnose } from './addictives/diagnose.model';

export interface AppointmentBlank {
    _id: ObjectId;
    complaints: Complaint;
    diagnose: Diagnose;
    appointmentResults: AppointmentResults;
    sessionId: ObjectId;
    doctorId: ObjectId;
    userId: ObjectId;
    inspections: string[];
}
