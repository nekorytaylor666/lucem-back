export interface DoctorEntity {
    _id: string;
    fullName: string;
    dateOfBirth: Date;
    yearsOfExperience: number;
    imageUrl: string;
    specialization: ISpecialization;
    jobDescription: string;
}
