import { ObjectId } from "mongodb";


export interface Service {
    _id?: ObjectId;
    name: string;
    price: number
}