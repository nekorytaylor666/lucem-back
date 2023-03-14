import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import {
    CreateSpecialization,
    CreateSpecializationVariables,
} from "@graphqlTypes/CreateSpecialization";
import { CREATE_SPECIALIZATION_MUTATION } from "../../../graphql/mutation/createSpecialization";
import { useFormik } from "formik";
import EditSpecializationModal from "../EditSpecializationModal";
import { DELETE_SPEC_BY_ID } from "graphql/mutation/deleteSpecialization";

interface SpecializationPageGridProps {
    specializations: any[];
    setShowEditSpecModal: any;
    setSpecializationToEdit: any;
}

const SpecializationPageGrid: React.FC<SpecializationPageGridProps> = ({
    specializations,
    setShowEditSpecModal,
    setSpecializationToEdit,
}) => {
    const handleEditButtonPress = (spec) => {
        setSpecializationToEdit(spec);
    };

    const handleEditModalOpenButtonPress = () => {
        setShowEditSpecModal(true);
    };

    const [deleteSpec, { loading }] = useMutation(DELETE_SPEC_BY_ID);

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-4">
                {specializations.map((specialization, index) => {
                    const secondaryGradientColor =
                        specialization?.colorCodeGradient?.finish;
                    const router = useRouter();
                    const age = router.query.route;

                    return (
                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <Link
                                href={`/services/${specialization._id}?age=${age}`}
                            >
                                <SpecializationCard
                                    key={index}
                                    gradientColors={[
                                        specialization?.colorCodeGradient
                                            ?.start,
                                        secondaryGradientColor,
                                    ]}
                                    className="rounded-2xl text-white relative overflow-hidden"
                                    style={{ zIndex: 1 }}
                                >
                                    <div className="p-4 lg:p-8 z-10 relative flex flex-col justify-between h-full items-start">
                                        <div className="mb-4 w-full lg:w-2/3">
                                            <h2 className="text-3xl w-full font-bold capitalize mb-4">
                                                {specialization.name}
                                            </h2>
                                            <p className=" text-xs lg:text-base">
                                                Услуг:{" "}
                                                {specialization.services.length}
                                            </p>
                                        </div>
                                    </div>
                                    <SpecBackgroundImage
                                        url={specialization?.photoURL?.xl}
                                        className=" h-4/5 absolute bottom-0 right-0 w-full "
                                    ></SpecBackgroundImage>
                                </SpecializationCard>
                            </Link>

                            <div
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    top: 10,
                                    fontWeight: 500,
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    zIndex: 5,
                                    color: "#fff",
                                }}
                            >
                                <button
                                    className=" mr-2"
                                    onClick={() => {
                                        handleEditButtonPress(specialization);
                                        handleEditModalOpenButtonPress();
                                    }}
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => {
                                        deleteSpec({
                                            variables: {
                                                specializationId:
                                                    specialization._id,
                                            },
                                            onCompleted: () => {
                                                router.reload();
                                            },
                                        });
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface SpecializationCardProps {
    gradientColors: [string, string];
    isExtended?: boolean;
}
export const SpecializationCard = styled.div<SpecializationCardProps>`
    min-height: 250px;
    grid-column-start: ${({ isExtended }) => isExtended && " span 2"};
    background: ${({ gradientColors }) =>
        `linear-gradient(115.4deg, ${gradientColors[0]} 0.63%, ${gradientColors[1]} 99.5%)`};
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
