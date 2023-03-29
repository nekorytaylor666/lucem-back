import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Doctor } from "custom_typings/doctor";
import { formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale";

interface SpecialistContainerProps {
    doctor: Doctor;
}
const SpecialistContainer: React.FC<SpecialistContainerProps> = ({
    doctor,
}) => {
    return (
        <Link href={`/doctor/${doctor._id}`}>
            <div className="flex flex-col justify-between lg:grid lg:grid-cols-2 lg:items-end rounded-lg shadow-lg pt-4 px-4 pb-0 w-full h-full">
                <div className="mb-4 h-full">
                    <div>
                        <p className="text-lg lg:text-3xl font-bold">
                            {doctor.fullName}
                        </p>
                    </div>
                    <div className="text-sm mt-4">
                        <p className="font-semibold">
                            {" "}
                            {formatDistanceStrict(
                                new Date(doctor.startingExperienceDate),
                                new Date(),
                                {
                                    locale: ru,
                                    addSuffix: false,
                                },
                            )}
                        </p>
                        <p>Опыт работы</p>
                    </div>
                    <div className="text-sm">
                        <p className="text-special-green font-semibold">
                            {doctor?.rating?.toPrecision(2)} / 10
                        </p>
                        <p>Рейтинг на основе {doctor.numOfRatings} отзывов</p>
                    </div>
                </div>
                <img
                    className="h-60 bottom-0 w-full object-contain object-bottom"
                    src={doctor?.avatar?.xl ?? "/images/doctor.png"}
                />
            </div>
        </Link>
    );
};

export default SpecialistContainer;
