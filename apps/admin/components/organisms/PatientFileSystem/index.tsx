import { useMutation } from "@apollo/client";
import { START_SESSION_MUTATION } from "@src/api/mutations/session";
import { UPLOAD_APPOINTMENT_RESULTS } from "@src/api/mutations/Upload-appointment-results";
import Modal from "components/atoms/Modal";
import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useMemo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface FileItem {
    description: string;
    imageURL: string;
}
interface PatientFileSystemProps {
    title: string;
    placeholder: string;
    token?: string;
    userId?: string;
    items?: FileItem[];
}

const PatientFileSystem: React.FC<PatientFileSystemProps> = ({
    title,
    placeholder,
    items = [],
    token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThiYjYwNDUwNjA0ZjU4ZjE5OWMwYTEiLCJmdWxsTmFtZSI6ItCQ0LvQuNGPINCg0YvRgdC_0LDQtdCy0LAg0KjQsNGP0YXQvNC10YLQvtCy0L3QsCIsImFjY2VwdGFibGVBZ2VHcm91cCI6ImFkdWx0IiwieWVhcnNPZkV4cGVyaWVuY2UiOjMzLCJwYXNzd29yZEhBU0giOiIkMmEkMTIkMFlJNW1PL2N2dlNTTlk1eFI3S2hILmQ0bjNhZXdqNTI2QUY0aGUvRjRFdVVNdENLS2xxR08iLCJlbWFpbCI6ItCQ0LvQuNGPQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiNzc3NTY0NTM1MjQiLCJkZXNjcmlwdGlvbiI6ItCn0YLQtdC90LjQtSDQutC90LjQsyIsImF2YXRhciI6eyJ0aHVtYm5haWwiOiJodHRwOi8vOTQuMjQ3LjEyOC4yMjQ6MzAwMC9tZWRpYS90aHVtYm5haWwtMTYzNjgxOTU0ODM0NnB6cmQ4LmpwZyIsIm0iOiJodHRwOi8vOTQuMjQ3LjEyOC4yMjQ6MzAwMC9tZWRpYS9tLTE2MzY4MTk1NDgzNDZwenJkOC5qcGciLCJ4bCI6Imh0dHA6Ly85NC4yNDcuMTI4LjIyNDozMDAwL21lZGlhL3hsLTE2MzY4MTk1NDgzNDZwenJkOC5qcGcifSwicm9sZSI6ImRvY3RvciIsImlhdCI6MTYzNzc0OTg1OSwiZXhwIjoxNjY5Mjg1ODU5LCJhdWQiOiIiLCJpc3MiOiIiLCJzdWIiOiIifQ.XbjAw3s_EFde86Or79eLVY_l8NIj-_t4O7P_MhkMzH30HMs6NiTAHwI8rv3_2UmUbZwadEuh3CgH6cQ1-3j9avYisSCG-f20a32kG2xr3IQhRSbnQz-5uvvFnVuMbvW3sgChTd80O_J82XIXFwcrENjmjUvz7spRGiHPfcaT_mA",
    userId = "613588dcc5a499f383433766",
}) => {
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [showImageGallery, setShowImageGallery] = useState(false);
    const [galleryState, setGalleryState] = useState<string[]>([]);
    const [mutate, { loading }] = useMutation(UPLOAD_APPOINTMENT_RESULTS);

    return (
        <div>
            {items && items.length > 0 ? (
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-xl mb-2">{title}</h3>
                        <button
                            onClick={() => setShowFileUpload(true)}
                            type="button"
                            className="btn btn-primary btn-ghost text-primary font-medium text-base py-2 px-8"
                        >
                            Добавить
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 bg-base-200 p-4 rounded-md">
                        {items.map((item) => (
                            <div className="p-4 bg-white shadow-md rounded-md">
                                <p className=" font-medium text-lg mb-2">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => {
                                        setShowImageGallery(true);
                                        setGalleryState((gallery) => [
                                            item.imageURL,
                                        ]);
                                    }}
                                    className="btn btn-ghost text-primary"
                                >
                                    1 изображение
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="font-medium text-xl mb-2">{title}</h3>
                    <p className="text-base-300 w-96 mb-2">{placeholder}</p>
                    <button
                        onClick={() => setShowFileUpload(true)}
                        type="button"
                        className="btn btn-primary btn-outline text-lg py-2 px-8"
                    >
                        Добавить
                    </button>
                </>
            )}
            <Modal active={showFileUpload}>
                <div className="bg-white p-8 rounded-xl">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PatientFileUploadForm
                            onClose={() => {
                                setShowFileUpload(false);
                            }}
                            onSubmit={({ file, description }) => {
                                mutate({
                                    context: {
                                        headers: {
                                            Authorization: token,
                                        },
                                    },
                                    variables: {
                                        image: file,
                                        description,
                                        userId,
                                    },
                                });
                            }}
                        ></PatientFileUploadForm>
                    )}
                </div>
            </Modal>
            <Modal active={showImageGallery}>
                <div
                    style={{ maxHeight: "90%", maxWidth: 1000 }}
                    className="bg-white p-4  rounded-xl"
                >
                    <ImageCarousel
                        onClose={() => setShowImageGallery(false)}
                        imgUrls={galleryState}
                    />
                </div>
            </Modal>
        </div>
    );
};

interface PatientFileUploadFormProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const PatientFileUploadForm: React.FC<PatientFileUploadFormProps> = ({
    onClose,
    onSubmit,
}) => {
    return (
        <Formik
            initialValues={{}}
            onSubmit={(data) => {
                onClose();
                onSubmit(data);
            }}
        >
            <Form>
                <h5 className="font-medium text-xl mb-4">Добавление файла</h5>
                <div className="form-control mb-4">
                    <label className="mb-1">
                        <span className=" text-base-300">Тип файла</span>
                    </label>
                    <Field
                        as="select"
                        name="description"
                        className="select select-bordered bg-base-200 py-1 flex-grow border-transparent font-light"
                    >
                        <option disabled selected value="null">
                            Клинический анализ крови
                        </option>
                        <option
                            value="I10 — Гипертоническая болезнь первой степени, первой
                            стадии, риск средней"
                        >
                            I10 — Гипертоническая болезнь первой степени, первой
                            стадии, риск средней
                        </option>
                    </Field>
                </div>
                <PatientFileUploadInput></PatientFileUploadInput>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn btn-primary text-lg px-6 py-1 mt-4 "
                    >
                        Добавить
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

const PatientFileUploadInput = () => {
    const formikProps = useFormikContext();
    const { values } = formikProps;
    const { file } = values as any;

    const handleFileChange = (e: any) => {
        formikProps.setFieldValue("file", e.target.files[0]);
    };

    return (
        <div>
            <span className=" text-base-300 mb-1">Загрузка</span>
            <label className="px-4 py-8 rounded-xl bg-base-200 text-base-300 flex justify-center items-center">
                <div className="flex justify-center items-center w-2/3">
                    {file ? (
                        <div>{file?.name}</div>
                    ) : (
                        <>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <p>
                                Перетащите файл сюда, или нажмите для выбора
                                файла с устройства
                            </p>
                        </>
                    )}
                </div>
                <input
                    className="hidden"
                    type="file"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

const ImageCarousel = ({
    imgUrls,
    onClose,
}: {
    imgUrls: string[];
    onClose: () => void;
}) => {
    return (
        <div className="w-full carousel flex flex-col ">
            <div className="flex justify-between w-full mb-4">
                <div>
                    <p className="text-3xl font-bold">Галерея</p>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="rounded-md border-primary h-full border-2">
                {imgUrls.map((imgUrl) => (
                    <div
                        id="slide1"
                        style={{ maxHeight: 600 }}
                        className="relative w-full relative   carousel-item"
                    >
                        <TransformWrapper
                            minScale={0.5}
                            centerZoomedOut={false}
                        >
                            <TransformComponent>
                                <img src={imgUrl} className="w-full " />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientFileSystem;
