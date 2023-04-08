import { SpecializationEntity } from "@core/types/specializations/ISpecialization";
import { Specialization } from "custom_typings/specialization";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface SpecializationPageGridProps {
    specializations: Specialization[];
}

const SpecializationTextGrid: React.FC<SpecializationPageGridProps> = ({
    specializations,
}) => {
    // alphabetically sort specializations and then group them by first letter
    const sortedSpecializations = specializations.sort((a, b) =>
        a.name.localeCompare(b.name),
    );
    const groupedSpecializations = sortedSpecializations.reduce((acc, curr) => {
        const firstLetter = curr.name[0];
        if (acc[firstLetter]) {
            acc[firstLetter].push(curr);
        } else {
            acc[firstLetter] = [curr];
        }
        return acc;
    }, {} as { [key: string]: Specialization[] });

    const sortedKeys = Object.keys(groupedSpecializations).sort((a, b) =>
        a.localeCompare(b, "ru"),
    );

    return (
        <div className="p-4 ">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {sortedKeys.map((letter) => (
                    <div className="w-full">
                        <div className="text-2xl font-bold">{letter}</div>
                        <ul>
                            {groupedSpecializations[letter].map(
                                (specialization) => (
                                    <Link
                                        href={`/specialization/${specialization._id}`}
                                    >
                                        <li className="text-lg cursor-pointer hover:bg-primary rounded-md p-2 px-4 hover:text-white transition-all ease-in-out">
                                            {specialization.name}
                                        </li>
                                    </Link>
                                ),
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecializationTextGrid;
