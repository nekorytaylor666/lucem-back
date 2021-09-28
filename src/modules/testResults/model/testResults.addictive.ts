import { Booking } from "src/modules/booking/model/booking.interface";
import { User } from "src/modules/user/model/user.interface";
import { TestResults } from "./testResults.interface";


export interface TestResultsAddictive extends TestResults {
    booking: Booking;
    user: User;
}