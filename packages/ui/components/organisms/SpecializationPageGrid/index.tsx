import { SpecializationEntity } from "@core/types/specializations/ISpecialization";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface SpecializationPageGridProps {
  specializations: SpecializationEntity[];
}

const SpecializationPageGrid: React.FC<SpecializationPageGridProps> = ({
  specializations,
}) => {
  const renderSpecCard = (
    specialization: SpecializationEntity,
    index: number
  ) => {
    const extendItemRate = 5;
    const isExtended = !(index % extendItemRate);
    const defaultSecondaryGradientColor = "FFFFFF";
    return (
      <SpecializationCard
        gradientColors={[
          specialization.accentColor,
          defaultSecondaryGradientColor,
        ]}
        isExtended={isExtended}
        className="rounded-2xl text-white relative overflow-hidden"
      >
        <div className="p-8 z-10 relative flex flex-col justify-between h-full items-start">
          <div className="mb-4 w-2/3">
            <h2 className="text-4xl font-bold capitalize mb-4">
              {specialization.title}
            </h2>
            <p className=" text-base">{specialization.description}</p>
          </div>
          <Link href={`/specialization/${specialization.slug}/doctors`}>
            <span className="px-12 py-1 capitalize text-lg bg-white text-black rounded cursor-pointer">
              Выбрать врача
            </span>
          </Link>
        </div>
        <SpecBackgroundImage
          url={specialization.imageUrl}
          className=" h-4/5 absolute bottom-0 right-0 w-full "
        ></SpecBackgroundImage>
      </SpecializationCard>
    );
  };
  return (
    <div className="container mx-auto">
      <SpecializationsGrid>
        {specializations.map(renderSpecCard)}
      </SpecializationsGrid>
    </div>
  );
};

const SpecializationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

interface SpecializationCardProps {
  gradientColors: [string, string];
  isExtended?: boolean;
}
const SpecializationCard = styled.div<SpecializationCardProps>`
  min-height: 250px;
  grid-column-start: ${({ isExtended }) => isExtended && " span 2"};
  background: ${({ gradientColors }) =>
    `linear-gradient(115.4deg, #${gradientColors[0]} 0.63%, #${gradientColors[1]} 99.5%)`};
`;

interface SpecBackgroundImageProps {
  url: string;
}

const SpecBackgroundImage = styled.div<SpecBackgroundImageProps>`
  background-image: url(${({ url }) => url ?? ""});
  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 0;
`;

export default SpecializationPageGrid;
