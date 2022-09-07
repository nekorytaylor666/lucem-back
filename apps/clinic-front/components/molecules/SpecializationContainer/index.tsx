import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { SpecializationEntity } from "../../../core/types/specializations/ISpecialization";
import Link from "next/link";
import { Specialization } from "custom_typings/specialization";
import { isMobile } from "react-device-detect";
interface SpecializationCardProps {
    specialization: Specialization;
}
const SpecializationCard: React.FC<SpecializationCardProps> = ({
    specialization,
}) => {
    return (
        <SpecializationCardContainer
            gradientColor={specialization?.colorCodeGradient?.start}
            className="flex flex-col pt-2 lg:pt-8 rounded-lg relative overflow-hidden"
        >
            <div className="z-20 w-full flex-1 flex flex-col items-start justify-between lg:px-5 p-3 text-white space pb-8">
                <div className="w-full mb-4" style={{ minHeight: "160px" }}>
                    <p className="w-4/5 truncate text-left text-lg lg:text-2xl font-bold">
                        {specialization?.name}
                    </p>
                    <p className="hidden md:block text-xs lg:text-sm">
                        {specialization?.description}
                    </p>
                </div>

                <Link href={`/specialization/${specialization?._id}`}>
                    <span className="text-center py-1 capitalize text-xs font-medium w-full lg:w-64 lg:text-lg bg-white text-black rounded cursor-pointer">
                        Выбрать врача
                    </span>
                </Link>
            </div>
            <div className="flex items-end h-full absolute bot-0 right-0 z-10">
                {specialization?.photoURL?.xl && (
                    <Image
                        height={isMobile ? 100 : 200}
                        width={isMobile ? 100 : 200}
                        src={specialization?.photoURL?.xl}
                    />
                )}
            </div>
        </SpecializationCardContainer>
    );
};

interface SpecializationCardContainerProps {
    gradientColor: string;
}
const SpecializationCardContainer = styled.div<SpecializationCardContainerProps>`
    background-image: ${({ gradientColor }) =>
        `linear-gradient(115.4deg, ${gradientColor} 0.63%, #fff 99.5%)`};
`;

export default SpecializationCard;
