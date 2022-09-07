import React, { useState } from "react";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SPECIALIZATIONS } from "graphql/query/getSpecs";
import {
    GetSpecializations,
    GetSpecializations_getSpecializations,
} from "graphql/query/getSpecs/__generated__/GetSpecializations";

import { AddServiceModal } from "components/molecules/AddServiceModal";
import { EditServiceModal } from "components/molecules/EditServiceModal";
import SpecializationPageGrid, {
    SpecializationCard,
} from "components/organisms/SpecializationPageGrid";
import { useFormik } from "formik";
import { CREATE_SPECIALIZATION_MUTATION } from "graphql/mutation/createSpecialization";
import {
    CreateSpecialization,
    CreateSpecializationVariables,
} from "@graphqlTypes/CreateSpecialization";
import EditSpecializationModal from "../../components/organisms/EditSpecializationModal";

const ServicesPage = () => {
    const [showAddSpezModal, setShowAddSpezModal] = useState(false);

    const { data, loading } = useQuery<GetSpecializations>(GET_SPECIALIZATIONS);
    const specializations = data?.getSpecializations;

    const [specializationToEdit, setSpecializationToEdit] = useState(null);
    const [showEditSpecModal, setShowEditSpecModal] = useState(false);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="p-5">
                <div className="flex justify-between mb-4">
                    <p className="text-4xl font-bold">Услуги</p>
                    <div className="flex space-x-5">
                        <input
                            type="text"
                            placeholder="Поиск по названию..."
                            className="input bg-white"
                        />
                        <button
                            onClick={() => setShowAddSpezModal(true)}
                            className="flex bg-pink-purple p-2 text-white rounded items-center"
                        >
                            Добавить специализацию{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <SpecializationPageGrid
                    specializations={specializations ?? []}
                    setShowEditSpecModal={setShowEditSpecModal}
                    setSpecializationToEdit={setSpecializationToEdit}
                />
            </div>
            <AddSpecializationModal
                active={showAddSpezModal}
                onClose={() => setShowAddSpezModal(false)}
            />

            {specializationToEdit && (
                <EditSpecializationModal
                    active={showEditSpecModal && specializationToEdit}
                    onClose={() => setShowEditSpecModal(false)}
                    initialData={specializationToEdit}
                />
            )}
        </div>
    );
};

const AddSpecializationModal: React.FC<{
    active: boolean;
    onClose: () => void;
}> = ({ active, onClose }) => {
    const [createSpecMutation] = useMutation<
        CreateSpecialization,
        CreateSpecializationVariables
    >(CREATE_SPECIALIZATION_MUTATION);
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            specImage: undefined,
            name: "",
            colorCodeGradient: {
                start: "",
                finish: "",
            },
            description: "",
        },
        onSubmit(values) {
            createSpecMutation({
                variables: {
                    ...values,
                },
                onCompleted() {
                    alert("Create!");
                    onClose();
                },
            });
        },
    });
    return (
        <div id="my-modal" className={`modal ${active && "modal-open"}`}>
            <form
                onSubmit={handleSubmit}
                className="modal-box max-w-2xl overflow-hidden space-y-5"
            >
                <div className="flex justify-between">
                    <p className="text-4xl font-bold">
                        Добавление специализации
                    </p>
                    <button onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3">
                    <p className="text-2xl font-semibold">
                        Название специализации
                    </p>
                    <input
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        type="text"
                        className="p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                        placeholder="Название"
                    />
                </div>
                <div className="space-y-3">
                    <p className="text-2xl font-semibold">
                        Описание специализации
                    </p>
                    <textarea
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        className="textarea p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                        placeholder="Описание"
                    ></textarea>
                </div>
                <div className="space-y-3">
                    <p className="text-2xl font-semibold">
                        Фотограция специализации
                    </p>
                    <input
                        onChange={handleChange}
                        value={values.specImage}
                        name="specImage"
                        type="file"
                        accept="image/*"
                        className="textarea p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                        placeholder="Описание"
                    ></input>
                </div>
                <div>
                    <p className="text-2xl font-semibold mb-2">
                        Цвета градиента
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                onChange={handleChange}
                                value={values.colorCodeGradient.start}
                                name="colorCodeGradient.start"
                                type="text"
                                className="p-2 border mr-2 border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                placeholder="Первый цвет"
                            />
                            <div
                                style={{
                                    backgroundColor:
                                        values.colorCodeGradient.start,
                                }}
                                className="h-6 w-6 border"
                            ></div>
                        </div>
                        <div className="flex items-center">
                            <input
                                onChange={handleChange}
                                value={values.colorCodeGradient.finish}
                                name="colorCodeGradient.finish"
                                type="text"
                                className="p-2 mr-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                placeholder="Второй цвет"
                            />
                            <div
                                style={{
                                    backgroundColor:
                                        values.colorCodeGradient.finish,
                                }}
                                className="h-6 w-6 border"
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-pink-purple p-3 rounded text-white">
                        Добавить специализацию
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServicesPage;
