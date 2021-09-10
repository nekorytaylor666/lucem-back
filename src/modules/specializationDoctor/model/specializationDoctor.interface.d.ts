import { ObjectId } from "mongodb";

export interface SpecializationDoctor {
    _id?: ObjectId;
    doctorId: ObjectId;
    specializationId: ObjectId;
}