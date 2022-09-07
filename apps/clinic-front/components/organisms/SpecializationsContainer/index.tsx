import React from "react";
import SpecializationCard from "components/molecules/SpecializationContainer";
import { specializations } from "@core/mock/specializations";
import { useAllSpecializations } from "@recoil/hooks";
import Link from "next/link";
import { Specialization } from "custom_typings/specialization";
import { isMobile } from "react-device-detect";

const SpecializationsContainer = ({
    specializations,
}: {
    specializations: Specialization[];
}) => {
    const [specializationsList] = useAllSpecializations();
    let firstRowSpecs = specializations.slice(0, 2);
    let otherSpecs = specializations.slice(1, 4);
    let last = specializations.slice(4, 6);
    if (isMobile) {
        firstRowSpecs = specializations.slice(0, 2);
        otherSpecs = specializations.slice(2, 4);
        last = specializations.slice(4, 5);
    }
    return (
        <div className="my-10">
            <p className="text-2xl lg:text-4xl font-bold">
                Более 20 специализаций
            </p>
            <br />
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                    {firstRowSpecs.map((spec) => (
                        <SpecializationCard specialization={spec} />
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4 mt-2 lg:mt-4 ">
                    {otherSpecs.map((spec) => (
                        <SpecializationCard specialization={spec} />
                    ))}
                </div>

                <div className="grid grid-cols-12 mt-2">
                    <div className="col-start-1 col-end-13 flex justify-center cursor-pointer text-pink-purple bg-gray-100 py-3 px-6 rounded-md ">
                        <Link href="/specializations">
                            <span className="">Смотреть все специализации</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecializationsContainer;
