import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeseaseInput } from '../model/desease.inputs';
import { Desease, DeseaseDocument } from '../model/desease.model';

@Injectable()
export class DeseaseService {
    constructor(
        @InjectModel(Desease.name) private deseaseModel: Model<DeseaseDocument>,
    ) {}

    create(payload: CreateDeseaseInput) {
        const createdPerson = new this.deseaseModel(payload);
        return createdPerson.save();
    }
}
