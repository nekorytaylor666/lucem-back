import { Doctor } from "./doctor";

export interface Service {
    _id: string;
    description: string;
    doctors: Doctor[];
    name: string;
    price: number;
}
