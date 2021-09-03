import { Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";
import { CreateDoctor } from "../model/createDoctor.args";
import * as bcrypt from "bcryptjs";
import { Doctor } from "../model/doctor.interface";
import { TokenService } from "src/modules/helpers/token/token.service";
import { TokenRoles } from "src/modules/helpers/token/token.interface";


@Injectable()
export class DoctorService {
  constructor(
    @Inject('DATABASE_CONNECTION') private database: Db,
    private tokenService: TokenService
    ) {}

  private get doctorCollection() {
    return this.database.collection('doctor');
  }

  async createDoctor(args: CreateDoctor): Promise<Doctor> {
    const { fullName, email, phoneNumber: _phoneNumber, password, dateOfBirth: _dateOfBirth } = args;
    const passwordHASH = await bcrypt.hash(password, 12);
    const dateOfBirth = new Date(_dateOfBirth);
    const phoneNumber = _phoneNumber.replace(/\D/g, '');
    const doctor: Doctor = {
      fullName,
      email,
      passwordHASH,
      dateOfBirth,
      phoneNumber
    }
    const insertDoctor = await this.doctorCollection.insertOne(doctor);
    const token = this.tokenService.create({ user: {
      _id: insertDoctor.insertedId,
      email,
      phoneNumber,
      dateOfBirth,
      fullName
    }, role: TokenRoles.Doctor });
    [doctor._id, doctor.token] = [insertDoctor.insertedId, token];
    return doctor;
  }
}