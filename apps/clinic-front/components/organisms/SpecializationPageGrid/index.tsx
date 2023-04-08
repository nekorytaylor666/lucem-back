import { SpecializationEntity } from "@core/types/specializations/ISpecialization";
import { Specialization } from "custom_typings/specialization";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface SpecializationPageGridProps {
    specializations: Specialization[];
}

const SpecializationPageGrid: React.FC<SpecializationPageGridProps> = ({
    specializations,
}) => {
    const renderSpecCard = (specialization: Specialization, index: number) => {
        const extendItemRate = 5;
        const isExtended = !(index % extendItemRate);
        const defaultSecondaryGradientColor = "FFFFFF";
        const router = useRouter();
        const age = router.query.route;
        return (
            <Link href={`/specialization/${specialization._id}?age=${age}`}>
                <SpecializationCard
                    key={index}
                    gradientColors={[
                        specialization?.colorCodeGradient?.start,
                        defaultSecondaryGradientColor,
                    ]}
                    isExtended={isExtended}
                    className="rounded-2xl text-white relative overflow-hidden"
                >
                    <div className="p-4 lg:p-8 z-10 relative flex flex-col justify-between h-full items-start">
                        <div
                            style={{ minHeight: "160px" }}
                            className="mb-4 w-full lg:w-2/3"
                        >
                            <h2 className="text-xl w-full lg:text-4xl font-bold capitalize mb-4">
                                {specialization.name}
                            </h2>
                            <p className="hidden md:block text-xs lg:text-base">
                                {specialization.description}
                            </p>
                        </div>

                        <span className=" text-center w-full lg:w-64 flex justify-center py-1 capitalize  text-base lg:text-lg bg-white text-black rounded cursor-pointer">
                            Выбрать врача
                        </span>
                    </div>
                    <SpecBackgroundImage
                        url={specialization?.photoURL?.xl}
                        className=" h-4/5 absolute bottom-0 right-0 w-full "
                    ></SpecBackgroundImage>
                </SpecializationCard>
            </Link>
        );
    };
    const sortedSpecializations = specializations.sort((a, b) =>
        a.name.localeCompare(b.name, "ru"),
    );
    return (
        <div className=" ">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 p-4">
                {sortedSpecializations.map(renderSpecCard)}
            </div>
        </div>
    );
};

interface SpecializationCardProps {
    gradientColors: [string, string];
    isExtended?: boolean;
}
const SpecializationCard = styled.div<SpecializationCardProps>`
    min-height: 250px;
    grid-column-start: ${({ isExtended }) => isExtended && " span 2"};
    background: ${({ gradientColors }) =>
        `linear-gradient(115.4deg, ${gradientColors[0]} 0.63%, #${gradientColors[1]} 99.5%)`};
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
