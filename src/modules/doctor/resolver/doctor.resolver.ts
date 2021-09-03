import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateDoctor } from "../model/createDoctor.args";
import { DoctorGraph } from "../model/doctor.model";
import { DoctorService } from "../service/doctor.service";


@Resolver()
export class DoctorResolver {
    constructor(private doctorService: DoctorService) {}

    @Mutation(() => DoctorGraph)
    async registerDoctor(@Args() args: CreateDoctor) {
        const createDoctor = await this.doctorService.createDoctor(args);
        const doctorResponce = new DoctorGraph({ ...createDoctor });
        return doctorResponce;
    }
}