import { useMutation, useQuery } from "@apollo/client";
import {
    CreateBooking,
    CreateBookingVariables,
} from "@graphqlTypes/CreateBooking";
import {
    GetDoctorSearch,
    GetDoctorSearch_getAllDoctors,
} from "@graphqlTypes/GetDoctorSearch";
import {
    GetServiceByDoctorId,
    GetServiceByDoctorIdVariables,
    GetServiceByDoctorId_getServicesByDoctorId,
} from "@graphqlTypes/GetServiceByDoctorId";
import { CREATE_BOOKING_MUTATION } from "@src/api/mutations/create-booking";
import { GET_DOCTORS_SEARCH } from "@src/api/queries/getDoctorSearch";
import { GET_SERVICE_BY_DOCTOR_ID } from "@src/api/queries/getServiceByDoctorId";
import { getDoctorTokens } from "@src/utils/getToken";
import AppointmentTimeTable from "components/molecules/AppointmentTimeTable";
import { addMinutes } from "date-fns";
import { Field, Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";

export interface ActionType {
    value: string;
    label: string;
}

const actionTypes: ActionType[] = [
    { value: "forward", label: "Создать назначение" },
    { value: "booking", label: "Записать на услугу" },
];
export interface ServicePayload {
    doctorId: string;
    serviceId: string;
    bookingtime: string;
    actionType: ActionType;
    doctor: GetDoctorSearch_getAllDoctors;
    service: GetServiceByDoctorId_getServicesByDoctorId;
}

interface AddServiceModalProps {
    onAddService: (service: ServicePayload) => void;
}

export const AddServiceModal: FC<AddServiceModalProps> = ({ onAddService }) => {
    const [actionType, setActionType] = useState(actionTypes[0]);

    const {
        handleSubmit,
        submitForm,
        resetForm,
        handleChange,
        values,
        setFieldValue,
    } = useFormik({
        onSubmit: (values) => {
            const doctor = doctors.filter(
                (doctor) => doctor._id === values.doctorId,
            )[0];
            const service = services.filter(
                (service) => service._id === values.serviceId,
            )[0];
            onAddService({ ...values, doctor, service, actionType });
            resetForm();
        },
        initialValues: {
            doctorId: "",
            serviceId: "",
            bookingtime: "",
            dateType: "unexpirable",
            expirableDate: "",
        },
    });
    const { data: doctorsData, loading: doctorLoading } =
        useQuery<GetDoctorSearch>(GET_DOCTORS_SEARCH, {
            onCompleted(data) {
                setFieldValue("doctorId", data?.getAllDoctors?.[0]?._id);
            },
        });
    const { data: servicesData, loading: servicesLoading } = useQuery<
        GetServiceByDoctorId,
        GetServiceByDoctorIdVariables
    >(GET_SERVICE_BY_DOCTOR_ID, {
        variables: {
            doctorId: values.doctorId,
        },
        skip: !values.doctorId,
        onCompleted(data) {
            setFieldValue("serviceId", data?.getServicesByDoctorId?.[0]?._id);
        },
    });

    if (doctorLoading) {
        return <div>Loading...</div>;
    }

    const doctors = doctorsData.getAllDoctors;
    const services = servicesData?.getServicesByDoctorId ?? [];
    const doctor = doctors.find((doctor) => doctor._id === values.doctorId);

    const doesDoctorHaveWorkTime =
        doctor && doctor?.workTimes && doctor.workTimes.length > 0;

    const isAddServiceDisabled =
        !doesDoctorHaveWorkTime && actionType.value === "booking";

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text  text-dark-grey">Врач</span>
                </label>
                <select
                    onChange={handleChange}
                    value={values.doctorId}
                    name={"doctorId"}
                    className="select select-bordered w-full  border-transparent font-light"
                >
                    {doctors.map((doctor) => (
                        <option value={doctor._id}>
                            {doctor.fullName} (
                            {doctor.specializations
                                .map((spec) => spec.name)
                                .join(", ")}
                            )
                        </option>
                    ))}
                </select>
            </div>
            {services.length > 0 && !servicesLoading ? (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text  text-dark-grey">
                            Название услуги
                        </span>
                    </label>
                    <select
                        onChange={handleChange}
                        value={values.serviceId}
                        name={"serviceId"}
                        className="select select-bordered w-full  border-transparent font-light"
                    >
                        {services.map((service) => (
                            <option value={service._id}>{service.name}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="form-control mt-4">
                    <select
                        onChange={handleChange}
                        value={values.serviceId}
                        name={"serviceId"}
                        className="select select-bordered w-full  border-transparent font-light"
                    >
                        <option value="">Нет услуг</option>
                    </select>
                </div>
            )}
            <CategoryPick
                current={actionType}
                categories={actionTypes}
                onCategoryChange={(category) => {
                    setActionType(category);
                }}
            ></CategoryPick>
            {actionType.value === "booking" &&
                doctors &&
                doctors.length > 0 && (
                    <div className="bg-white p-4">
                        {doesDoctorHaveWorkTime ? (
                            <AppointmentTimeTable
                                value={values.bookingtime}
                                onChange={(time) =>
                                    setFieldValue("bookingtime", time)
                                }
                                doctor={doctor}
                            ></AppointmentTimeTable>
                        ) : (
                            <div>У доктора нет расписания</div>
                        )}
                    </div>
                )}
            {actionType.value === "forward" && doctors && doctors.length > 0 && (
                <div className="bg-white p-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text  text-dark-grey">
                                Окончание
                            </span>
                        </label>
                        <div className="flex items-center">
                            <input
                                id="unexpirable"
                                type="radio"
                                name="dateType"
                                value="unexpirable"
                                checked={values.dateType === "unexpirable"}
                                onChange={handleChange}
                            ></input>
                            <label className="label" htmlFor="unexpirable">
                                Никогда
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="expirable"
                                type="radio"
                                name="dateType"
                                value="expirable"
                                checked={values.dateType === "expirable"}
                                onChange={handleChange}
                            ></input>
                            <label className="label" htmlFor="expirable">
                                Дата
                            </label>
                            {values.dateType === "expirable" && (
                                <input
                                    onChange={handleChange}
                                    className="input ml-2 bg-base-200"
                                    type="date"
                                    name="expireDate"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
            <button
                disabled={isAddServiceDisabled}
                type="button"
                onClick={submitForm}
                className={`mt-4 btn w-full py-2 ${
                    isAddServiceDisabled ? " btn-disabled" : "  btn-primary"
                }`}
            >
                Добавить
            </button>
        </form>
    );
};

const CategoryPick = ({ categories, current, onCategoryChange }) => {
    return (
        <div className="w-full bg-light-grey rounded-2xl my-4 flex justify-evenly">
            {categories.map((category) => (
                <div
                    onClick={() => {
                        onCategoryChange(category);
                    }}
                    key={category.value}
                    className={`w-full flex justify-center items-center p-2 rounded cursor-pointer ${
                        category.value === current.value
                            ? "bg-link-purple text-white"
                            : "text-black bg-base-100"
                    }`}
                >
                    {category.label}
                </div>
            ))}
        </div>
    );
};
