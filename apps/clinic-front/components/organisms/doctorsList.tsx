import React from "react";
// import { SpecializationEntity } from "@core/types/specializations/ISpecialization";
import DoctorContainer from "components/organisms/DoctorContainer";
import { Doctor } from "custom_typings/doctor";
interface Props {
    doctors?: any[];
}
const DoctorsList: React.FC<Props> = ({ doctors }: Props) => {
    return (
        <div className="container p-8">
            <h1 className="text-2xl lg:text-4xl font-bold mb-8">
                Запись к Доктору
            </h1>
            <div className="space-y-8">
                {doctors?.map((doctor, index) => (
                    <DoctorContainer
                        key={index}
                        doctor={doctor}
                    ></DoctorContainer>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
