import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { CREATE_SERVICE } from "graphql/mutation/createService";
import {
    CreateService,
    CreateServiceVariables,
} from "graphql/mutation/createService/__generated__/CreateService";

export const AddServiceModal: React.FC<{
    active: boolean;
    specializationId: string;
    onClose: () => void;
}> = ({ active, onClose, specializationId }) => {
    const [createServiceMutation, { data, loading, error }] = useMutation<
        CreateService,
        CreateServiceVariables
    >(CREATE_SERVICE);

    return (
        <div id="my-modal" className={`modal ${active && "modal-open"}`}>
            <div className="modal-box max-w-2xl overflow-hidden space-y-5">
                <div className="flex justify-between">
                    <p className="text-4xl font-bold">Добавление услуги</p>
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
                <Formik
                    initialValues={{
                        serviceName: "",
                        description: "",
                        price: 0,
                        isShown: "true",
                        durationInMinutes: 30
                    }}
                    onSubmit={async ({
                        description,
                        serviceName,
                        price,
                        isShown,
                        durationInMinutes,
                    }) => {
                        createServiceMutation({
                            variables: {
                                name: serviceName,
                                description,
                                price: price,
                                isShown: isShown === "true",
                                specializationId,
                                durationInMinutes: +durationInMinutes,
                            },
                            onCompleted() {
                                onClose();
                            },
                        });
                    }}
                >
                    <Form className="space-y-3">
                        <div className="space-y-3">
                            <p className="text-xl">Название услуги</p>
                            <Field
                                name="serviceName"
                                type="text"
                                className="p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                placeholder="Название"
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 space-y-3">
                                <p className="text-xl">Цена за услугу, тг.</p>
                                <Field
                                    name="price"
                                    type="number"
                                    className="p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                    placeholder="Цена"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 space-y-3">
                                <p className="text-xl">Продолжительность, минут</p>
                                <Field
                                    name="durationInMinutes"
                                    type="number"
                                    className="p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                    placeholder="30"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl">Направление</p>
                            <div className="flex space-x-2 items-center">
                                <Field
                                    type="radio"
                                    name="isShown"
                                    className="radio radio-primary"
                                    value="false"
                                />
                                <p>Нужно</p>
                            </div>
                            <div className="flex space-x-2 items-center">
                                <Field
                                    type="radio"
                                    name="isShown"
                                    className="radio radio-primary"
                                    value="true"
                                />
                                <p>Не нужно</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-pink-purple p-3 rounded text-white"
                            >
                                Добавить услугу
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
