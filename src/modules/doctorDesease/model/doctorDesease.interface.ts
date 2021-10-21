import { ObjectId } from "mongodb";


export interface DoctorDesease {
    _id?: ObjectId;
    doctorId: ObjectId;
    deseaseId: ObjectId;
}