import { useAppointment } from "@recoil/hooks";
import { getDate, getTime } from "date-fns";
import { useFormik } from "formik";
import { getDayName } from "src/helper";
import InputMask from "react-input-mask";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTER_USER, CREATE_BOOKING } from "graphql/mutations";
import {
    CreateBooking,
    CreateBookingVariables,
} from "graphql/mutations/createBooking/__generated__/CreateBooking";
import { GET_SERVICE_BY_ID } from "graphql/queries/getServiceById";
import router from "next/router";
import toast from "react-hot-toast";

const UnregistredBookingForm = ({ phoneNumber, appointmentData }) => {
    const { show, doctor, time } = appointmentData;
    const [loadingBooking, setLoadingBooking] = useState(false);

    const validate = (values) => {
        const errors = {} as any;

        if (!values.firstName) {
            errors.firstName = "Обязательное поле";
        }

        if (!values.lastName) {
            errors.lastName = "Обязательное поле";
        }
        if (!values.email) {
            errors.email = "Обязательное поле";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Введите корректный email";
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = "Обязательное поле";
        }

        return errors;
    };
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber,
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            registerUser(values);
        },
    });

    const [registerUser, { loading: isRegistering }] = useMutation(
        REGISTER_USER,
        {
            variables: {
                email: formik.values.email,
                fullName:
                    formik.values.firstName + " " + formik.values.lastName,
                phoneNumber: formik.values.phoneNumber,
                password: "123456",
            },
            onError: (err) => {
                console.log(err.message);
            },
            onCompleted: async (data) => {
                console.log({
                    doctorId: doctor?._id,
                    endDate: new Date(time.end),
                    startDate: new Date(time.start),
                    userId: data.registerUser._id,
                    serviceId: doctor?.defaultService?._id,
                });
                setLoadingBooking(true);
                const res = await createBooking({
                    variables: {
                        doctorId: doctor?._id,
                        endDate: new Date(time.end),
                        startDate: new Date(time.start),
                        userId: data.registerUser._id,
                        serviceId: doctor?.defaultService?._id,
                    },
                    context: {
                        headers: {
                            Authorization: data.registerUser.token,
                        },
                    },

                    onError: (err) => {
                        setLoadingBooking(false);
                        toast("Произошла ошибка, попробуйте еще раз", {
                            icon: "🚨",
                        });
                    },
                    onCompleted: () => {
                        setLoadingBooking(false);
                        toast("Вы успешно записались на прием", {
                            icon: "👏",
                        });
                        // router.push("/success");
                    },
                });
            },
        },
    );
    const [createBooking, { loading: isCreatingBooking }] = useMutation<
        CreateBooking,
        CreateBookingVariables
    >(CREATE_BOOKING);
    const { data: serviceRes, loading: serviceLoading } = useQuery(
        GET_SERVICE_BY_ID,
        {
            variables: {
                serviceId: doctor?.defaultService?._id,
            },
            skip: !doctor?.defaultService?._id,
        },
    );

    return (
        <>
            {" "}
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="flex space-x-2">
                    <div className="flex-1 space-y-2">
                        <p className="text-dark-grey">Имя пациента</p>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Имя"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-dark-grey">Фамилия пациента</p>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Фамилия"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-dark-grey">
                        Email для получения записи в календаре
                    </p>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="example@email.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <p className="text-dark-grey">
                        Телефон для подтверждения записи
                    </p>
                    <InputMask
                        disabled
                        mask="+7 (999) 999-99-99"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        className="input input-disabled w-full"
                        placeholder="+7 ("
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex-1">
                    <button
                        type="submit"
                        className="bg-pink-purple w-full px-2 py-3 text-white rounded"
                    >
                        {isCreatingBooking || isRegistering
                            ? "Загрузка..."
                            : "Записаться"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default UnregistredBookingForm;
