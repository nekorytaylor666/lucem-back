import { Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";
import { User } from "../model/user.interface";





@Injectable()
export class UserService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    get userCollection() {
        const collection = this.database.collection<User>('user');
        return collection;
    }

    async findOne(user: Partial<User>): Promise<User> {
        const userResponce = this.userCollection.findOne(user);
        return userResponce;
    }
}