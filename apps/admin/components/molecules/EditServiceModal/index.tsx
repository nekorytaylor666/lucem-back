import { useMutation } from "@apollo/client";
import { EditService, EditServiceVariables } from "@graphqlTypes/EditService";
import { Formik, Form, Field } from "formik";

import { EDIT_SERVICE } from "graphql/mutation/editService";
import { GET_SPECIALIZATIONS } from "graphql/query/getSpecs";

export const EditServiceModal: React.FC<{
    active: boolean;
    specializationId: [string];
    onClose: () => void;
    service: any;
}> = ({ active, onClose, specializationId, service }) => {
    const [editServiceMutation, { data, loading, error }] = useMutation<
        EditService,
        EditServiceVariables
    >(EDIT_SERVICE);
    return (
        <div id="my-modal" className={`modal ${active && "modal-open"}`}>
            <div className="modal-box max-w-2xl overflow-hidden space-y-5">
                <div className="flex justify-between">
                    <p className="text-4xl font-bold">Редактирование услуги</p>
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
                        serviceName: service?.name,
                        description: service?.description,
                        price: service?.price,
                        isShown: service?.isShown,
                        durationInMinutes: service?.durationInMinutes,
                    }}
                    onSubmit={async ({
                        description,
                        serviceName,
                        price,
                        isShown,
                        durationInMinutes,
                    }) => {
                        await editServiceMutation({
                            variables: {
                                name: serviceName,
                                description,
                                serviceId: service?._id,
                                price: price,
                                isShown: isShown === "true",
                                specializationId,
                                durationInMinutes: +durationInMinutes,
                            },
                            refetchQueries: [GET_SPECIALIZATIONS],
                        });
                        onClose();
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
                                <p className="text-xl">
                                    Продолжительность, минут
                                </p>
                                <Field
                                    name="durationInMinutes"
                                    type="number"
                                    className="p-2 border border-gray-100 focus:outline-none focus:border-pink-purple rounded w-full"
                                    placeholder={service.durationInMinutes}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-pink-purple p-3 rounded text-white"
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
