import { useMutation, useQuery } from "@apollo/client";
import {
    GetServicesBySpecializationId,
    GetServicesBySpecializationIdVariables,
    GetServicesBySpecializationId_getServicesBySpecializationId,
} from "@graphqlTypes/GetServicesBySpecializationId";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import { AddServiceModal } from "components/molecules/AddServiceModal";
import { EditServiceModal } from "components/molecules/EditServiceModal";
import { useFormik } from "formik";
import { CREATE_SPECIALIZATION_MUTATION } from "graphql/mutation/createSpecialization";
import {
    CreateSpecialization,
    CreateSpecializationVariables,
} from "graphql/mutation/createSpecialization/__generated__/CreateSpecialization";
import { GET_SERVICES_BY_SPEC_ID } from "graphql/query/getServicesBySpecId";
import { GetSpecializations_getSpecializations } from "graphql/query/getSpecs/__generated__/GetSpecializations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GET_SPEC_BY_ID } from "../../graphql/query/getSpecializationById";

const ServicesBySpec = () => {
    const router = useRouter();
    // const { data: data } = useQuery<
    //     GetServicesBySpecializationId,
    //     GetServicesBySpecializationIdVariables
    // >(GET_SERVICES_BY_SPEC_ID, {
    //     variables: {
    //         specializationId: router.query.specId as string,
    //     },
    //     skip: !router?.query?.specId,
    // });

    const { data: specializationData } = useQuery(GET_SPEC_BY_ID, {
        variables: {
            specializationId: router.query.specId as string,
        },
        skip: !router?.query?.specId,
    });

    const [specialization, setSpecialization] = useState(null);

    useEffect(() => {
        if (specializationData) {
            setSpecialization(specializationData.getSpecializationById);
        }
    }, [specializationData]);

    return (
        <div>
            {specialization && (
                <ServicesList
                    specialization={specialization}
                    updateInfo={() => {
                        location.reload();
                        //TODO make updating without reloading
                    }}
                />
            )}
        </div>
    );
};

ServicesBySpec.getInitialProps = async (ctx) => {
    return {};
};

const ServicesList = ({
    specialization,
    updateInfo,
}: {
    specialization: any;
    updateInfo: any;
}) => {
    const {
        query: { specId },
    } = useRouter();
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const [showEditServiceModal, setShowEditServiceModal] = useState(false);
    const [selectedSpecialization, setSelectedSpecialization] =
        useState<any>("");
    const [selectedService, setSelectedService] = useState<any>(null);

    const servicesCountPerPage = 10;
    const paginationCount = Math.ceil(
        specialization.services.length / servicesCountPerPage,
    );
    const [selectedPageNumber, setSelectedPageNumber] = useState(1);
    const [servicesStartIndex, setServicesStartIndex] = useState(0);
    const [servicesEndIndex, setServicesEndIndex] = useState(10);
    const [servicesToShow, setServicesToShow] = useState(
        specialization.services.filter(
            (item: any, index: number) =>
                index >= servicesStartIndex && index < servicesEndIndex,
        ),
    );
    const paginationValues = [];
    for (let i = 0; i < paginationCount; i++) {
        paginationValues.push(i + 1);
    }

    useEffect(() => {
        setServicesToShow(
            specialization.services.filter(
                (item: any, index: number) =>
                    index >= servicesStartIndex && index < servicesEndIndex,
            ),
        );
    }, [servicesStartIndex, servicesEndIndex]);

    return (
        <>
            <div className="p-5 rounded-2xl bg-white shadow-md space-y-3 mt-5">
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        {specialization.name}
                    </p>
                    <button
                        onClick={() => {
                            setShowAddServiceModal(true);
                        }}
                        className="text-pink-purple px-3 py-1 rounded hover:bg-pink-purple hover:text-white"
                    >
                        Добавить услугу
                    </button>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <p className="text-gray-400">Название услуги</p>
                    </div>
                    <div className="flex justify-between flex-1">
                        <p className="text-gray-400">Цена, тенге</p>
                        <p className="text-gray-400">Консультация</p>
                        <p className="text-gray-400">Длительность, мин</p>
                    </div>
                </div>
                <hr />
                <div className="space-y-3">
                    {!specialization.services?.length && <p>Нет услуг</p>}
                    {servicesToShow?.map((service, index) => (
                        <ServiceCard
                            key={index}
                            name={service.name}
                            price={`${service.price}`}
                            consult="Не нужна"
                            duration={service.durationInMinutes}
                            onServiceClick={() => {
                                setSelectedService(service);
                                setShowEditServiceModal(true);
                            }}
                        />
                    ))}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "60%",
                    margin: "0 auto",
                    padding: 20,
                }}
            >
                {paginationValues.map((item, index) => (
                    <PaginationBlock
                        value={index + 1}
                        itemsPerPage={servicesCountPerPage}
                        setStartIndex={setServicesStartIndex}
                        setEndIndex={setServicesEndIndex}
                    />
                ))}
            </div>

            <AddServiceModal
                specializationId={specId as string}
                active={showAddServiceModal}
                onClose={() => {
                    updateInfo();
                    setShowAddServiceModal(false);
                }}
            />
            {selectedService && (
                <EditServiceModal
                    specializationId={[specId as string]}
                    active={showEditServiceModal}
                    onClose={() => {
                        setShowEditServiceModal(false);
                        setSelectedService(null);
                        setSelectedSpecialization(null);

                        location.reload();
                        //TODO make updating without reloading
                    }}
                    service={selectedService}
                />
            )}
        </>
    );
};

const PaginationBlock = ({
    value,
    itemsPerPage,
    setStartIndex,
    setEndIndex,
}) => {
    return (
        <div
            style={{
                padding: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                width: 40,
                height: 40,
                borderRadius: 4,
                backgroundColor: "#fff",
                boxShadow: "0 0 3px grey",
            }}
            onClick={() => {
                setStartIndex(value * itemsPerPage - itemsPerPage);
                setEndIndex(value * itemsPerPage);
            }}
        >
            {value}
        </div>
    );
};

interface ServicesProps {
    name: string;
    price: string;
    consult: string;
    duration: string;
    onServiceClick: () => void;
}

const ServiceCard: React.FC<ServicesProps> = ({
    name,
    price,
    consult,
    duration,
    onServiceClick,
}) => {
    return (
        <ElevatedContainer
            onClick={() => onServiceClick()}
            className="rounded cursor-pointer"
        >
            <div className="flex bg-white p-3 rounded">
                <div className="flex-1">
                    <p>{name}</p>
                </div>
                <div className="flex-1 grid grid-col-12">
                    <p className="col-start-1 col-end-5">{price}</p>
                    <p className="col-start-6 col-end-10">{consult}</p>
                    <p className="col-start-10 col-end-13">{duration}</p>
                </div>
            </div>
        </ElevatedContainer>
    );
};

export default ServicesBySpec;
