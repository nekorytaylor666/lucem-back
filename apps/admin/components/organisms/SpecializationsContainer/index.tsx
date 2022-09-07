import React from "react";
import SpecializationCard from "components/molecules/SpecializationContainer";
import { specializations } from "@core/mock/specializations";

const SpecializationsContainer = () => {
    const firstRowSpecs = specializations.slice(0, 2);
    const otherSpecs = specializations.slice(2, 5);
    return (
        <div className="my-10">
            <p className="text-4xl font-extrabold">Более 20 специализаций</p>
            <br />
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {firstRowSpecs.map((spec) => (
                        <SpecializationCard specialization={spec} />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {otherSpecs.map((spec) => (
                        <SpecializationCard specialization={spec} />
                    ))}
                </div>
                <div>
                    <button className="text-pink-purple bg-gray-100 w-full py-3 rounded-md">
                        Смотреть все специализации
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecializationsContainer;
