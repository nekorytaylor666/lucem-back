import { ObjectId } from "mongodb";


export interface Service {
    _id?: ObjectId;
    name: string;
    price: number;
    description: string;
    doctorId?: ObjectId[]
    isShown?: false;
}