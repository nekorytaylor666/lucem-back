import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { SpecializationEntity } from "../../../core/types/specializations/ISpecialization";
import Link from "next/link";
interface SpecializationCardProps {
  specialization: SpecializationEntity;
}
const SpecializationCard: React.FC<SpecializationCardProps> = ({
  specialization,
}) => {
  return (
    <SpecializationCardContainer
      gradientColor={specialization?.accentColor}
      className="flex pt-8 rounded-lg"
    >
      <div className="flex-1 flex flex-col justify-between px-5 text-white space-y-4 pb-8">
        <div>
          <p className="text-2xl font-bold">{specialization?.title}</p>
          <p className="text-sm">{specialization?.description}</p>
        </div>
        <Link href={`/specialization/${specialization?.slug}/doctors`}>
          <span className="text-center py-1 capitalize text-lg bg-white text-black rounded cursor-pointer">
            Выбрать врача
          </span>
        </Link>
      </div>
      <div className="flex flex-1 items-end">
        <Image
          height={298}
          width={299}
          src={specialization?.imageUrl}
          className="justify-end"
        />
      </div>
    </SpecializationCardContainer>
  );
};

interface SpecializationCardContainerProps {
  gradientColor: string;
}
const SpecializationCardContainer = styled.div<SpecializationCardContainerProps>`
  background-image: ${({ gradientColor }) =>
    `linear-gradient(115.4deg, #${gradientColor} 0.63%, #fff 99.5%)`};
`;

export default SpecializationCard;
