import { useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { EDIT_SPECIALIZATION_WITHOUT_FILE_MUTATION } from "../../../graphql/mutation/editSpecializationWithoutFile";
import { EDIT_SPECIALIZATION_WITH_FILE_MUTATION } from "../../../graphql/mutation/editSpecializationWithFile";
import { GetSpecializations_getSpecializations_colorCodeGradient } from "@graphqlTypes/GetSpecializations";

export default function EditSpecializationModal({
    active,
    onClose,
    initialData,
}) {
    const [editSpecWithoutFileMutation] = useMutation(
        EDIT_SPECIALIZATION_WITHOUT_FILE_MUTATION,
    );
    const [editSpecWithFileMutation] = useMutation(
        EDIT_SPECIALIZATION_WITH_FILE_MUTATION,
    );

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [specImage, setSpecImage] = useState("");
    const [colorCodeGradientStart, setColorCodeGradientStart] = useState("");
    const [colorCodeGradientFinish, setColorCodeGradientFinish] = useState("");

    const [newImageUploaded, setNewImageUploaded] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        //fileInputRef.current.value = null;
        setName(initialData.name ?? "");
        setDescription(initialData.description || "");
        setSpecImage(initialData.specImage ?? "");
        setColorCodeGradientStart(initialData.colorCodeGradient.start ?? "");
        setColorCodeGradientFinish(initialData.colorCodeGradient.finish ?? "");
        setNewImageUploaded(false);

        console.log(initialData);
    }, [initialData]);

    const handleSubmit = () => {
        editSpecWithoutFileMutation({
            variables: {
                colorCode: colorCodeGradientStart,
                colorCodeGradient: {
                    start: colorCodeGradientStart,
                    finish: colorCodeGradientFinish,
                } as GetSpecializations_getSpecializations_colorCodeGradient,
                description: description,
                specializationId: String(initialData._id),
                name: name,
            },
        });

        if (newImageUploaded) {
            editSpecWithFileMutation({
                variables: {
                    image: specImage,
                    specializationId: String(initialData._id),
                },
            });
        }

        alert("Информация обновлена!");
        onClose();
    };

    return (
        <div id="my-modal" className={`modal ${active && "modal-open"}`}>
            <div className="modal-box max-w-2xl overflow-hidden space-y-5">
                <div className="flex justify-between">
                    <p className="text-4xl font-bold">
                        Редактирование специализации
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        type="text"
                        className="p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                        placeholder="Название"
                    />
                </div>
                <div className="space-y-3">
                    <p className="text-2xl font-semibold">
                        {" "}
                        Описание специализации{" "}
                    </p>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        className="textarea p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                        placeholder="Описание"
                        value={description}
                    />
                </div>
                <div className="space-y-3">
                    <p className="text-2xl font-semibold">
                        При необходимости, выберите новую картинку
                    </p>
                    <input
                        onChange={(e) => {
                            setSpecImage(e.target.files[0]);
                            setNewImageUploaded(true);
                        }}
                        ref={fileInputRef}
                        name="specImage"
                        type="file"
                        accept="image/*"
                        className="textarea p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                    />
                </div>
                <div>
                    <p className="text-2xl font-semibold mb-2">
                        Цвета градиента
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                value={colorCodeGradientStart}
                                onChange={(e) =>
                                    setColorCodeGradientStart(e.target.value)
                                }
                                name="colorCodeGradient.start"
                                type="color"
                                className="p-2 border mr-2 border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                placeholder="Первый цвет"
                                style={{
                                    height: "50px",
                                    padding: 0,
                                }}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                value={colorCodeGradientFinish}
                                onChange={(e) =>
                                    setColorCodeGradientFinish(e.target.value)
                                }
                                name="colorCodeGradient.finish"
                                type="color"
                                className="p-2 mr-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                placeholder="Второй цвет"
                                style={{
                                    height: "50px",
                                    padding: 0,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-pink-purple p-3 rounded text-white"
                        onClick={handleSubmit}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
