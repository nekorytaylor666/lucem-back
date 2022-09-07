import { Booking } from "../bookings/IBookings";

export interface ConsultSessionEntity {
    generalReview: {
        reviews: { description: string }[];
    };
    illnessReason: {
        issues: string;
        illnesTimeLength: {
            amount: string;
            period: string;
        };
        reason: string;
    };
    diagnoses: {
        diagnoseType: string;
        mkb: string;
        fullIllnessDescription: string;
        illnessCharacteristics: string;
    };
    researchResult: {
        description: string;
    };
    curingPlan: any;
    references?: any;
}

export interface Session {
    _id: string;
    booking: Booking;
    count: number;
    endDate: string;
    startDate: string;
}
