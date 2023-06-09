import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import {
    CREATE_BOOKING,
    CHECK_SMS_VERIFICATION,
    SEND_VER_SMS,
    REGISTER_USER,
} from "graphql/mutations/";
import InputMask from "react-input-mask";

//Recoil Hooks
import { useAppointment } from "@recoil/hooks";

// Helper Functions
import { getDate, getTime, getDayName } from "src/helper";
import {
    CreateBooking,
    CreateBookingVariables,
    CreateBooking_createBooking,
} from "@graphqlTypes/CreateBooking";
import { GET_SERVICE_BY_ID } from "graphql/queries/getServiceById";
import { GET_USER_BY_PHONE_NUMBER } from "graphql/queries/getUserByPhoneNumber/getUserByPhoneNumber";
import { toast } from "react-hot-toast";
import InitialBookingForm from "./InitialBookingForm";
import UnregistredBookingForm from "./UnregisteredBookingForm";
interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    password: string;
    code: string;
}

const AppointmentModal = () => {
    const [appointmentData, { setShow }] = useAppointment();
    const { show, doctor, time } = appointmentData;
    const [isUnregistred, setIsUnregistred] = useState(false);

    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    const validate = (values: FormValues) => {
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
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: "",
        password: "",
        code: "",
    };
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            sendVerSMS({ variables: { phoneNumber: values.phoneNumber } });
        },
    });

    const [existingUser, setExistingUser] = useState();
    const [appointmentSent, setAppointmentSent] = useState(false);
    const [seconds, setSeconds] = useState(30);
    const [token, setToken] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [loadingBooking, setLoadingBooking] = useState(false);
    const [unregisteredNumber, setUnregisteredNumber] = useState("");
    useEffect(() => {
        if (seconds > 0 && appointmentSent) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
    });

    const closeModal = (e: React.SyntheticEvent) => {
        if (modalRef.current === e.target) {
            setShow(false);
        }
    };

    const [
        getUserByPhoneNumber,
        {
            loading: isLoadingUserByPhoneNumber,
            error: errorGetUserByPhoneNumber,
        },
    ] = useLazyQuery(GET_USER_BY_PHONE_NUMBER, {
        variables: {
            phoneNumber: formik.values.phoneNumber,
        },
    });
    const [sendVerSMS] = useMutation(SEND_VER_SMS, {
        variables: {
            phoneNumber: formik.values.phoneNumber,
        },
        onError: (err) => {
            console.log(err.message);
        },
        onCompleted: () => {
            setCodeSent(true);
        },
    });
    const [checkSMSVerification] = useMutation(CHECK_SMS_VERIFICATION, {
        variables: {
            code: formik.values.code,
            phoneNumber: formik.values.phoneNumber,
        },
        onError: (err) => {
            toast("Неправильный код", {
                icon: "🚨",
            });
        },
        onCompleted: async (data) => {
            setLoadingBooking(true);
            setToken(data.checkSMSVerificationCode.token);
            const res = await getUserByPhoneNumber();

            if (res.error) {
                setIsUnregistred(true);
                setLoadingBooking(false);
                toast("Заполните данные для записи", {
                    icon: "🚨",
                });
                return;
            }
            const user = res.data.getUserByPhoneNumber;
            await createBooking({
                variables: {
                    doctorId: doctor?._id,
                    endDate: new Date(time.end),
                    startDate: new Date(time.start),
                    userId: user._id,
                    serviceId: doctor?.defaultService?._id,
                },
                context: {
                    headers: {
                        Authorization: data.checkSMSVerificationCode.token,
                    },
                },
                onError: (err) => {
                    toast("Произошла ошибка, попробуйте еще раз", {
                        icon: "🚨",
                    });
                },
                onCompleted: () => {
                    setLoadingBooking(false);
                    toast("Вы успешно записались на прием", {
                        icon: "👏",
                    });
                    router.push("/success");
                },
            });
        },
    });

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

    const onUnregisterUserDetectedHandler = (payload: {
        phoneNumber: string;
    }) => {
        setUnregisteredNumber(payload.phoneNumber);
        setIsUnregistred(true);
    };

    if (!show) {
        return <></>;
    }

    return (
        <>
            <Background ref={modalRef} onClick={closeModal}>
                <motion.div
                    style={{
                        height: "100%",
                        width: "99%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    animate={{ y: [0, -20, 0], opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <div className="py-8 px-6 bg-white rounded-2xl w-full lg:w-5/12 space-y-4 overflow-y-scroll max-h-screen lg:h-auto">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-3xl font-bold">
                                    Запись на прием
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        setShow(!show);
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
                        <div className="flex">
                            <div className="flex-1 flex flex-col items-center ">
                                <Image
                                    width={216}
                                    height={163}
                                    src={
                                        doctor?.avatar?.xl ??
                                        "/images/doctor.png"
                                    }
                                    className="self-start object-contain object-bottom "
                                />
                            </div>
                            <div className="flex flex-1 flex-col items-center">
                                <div>
                                    <p className="text-dark-grey">
                                        {doctor?.specializations
                                            ?.map((spec) => spec.name)
                                            .join(", ")}
                                    </p>
                                    <p className="text-xl font-bold">
                                        {doctor?.fullName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            {!serviceLoading && (
                                <p className="text-xl text-dark-grey">
                                    Стоимость услуги "
                                    {serviceRes?.getServiceById?.name}":{" "}
                                    {serviceRes?.getServiceById?.price} тг.
                                </p>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1 space-y-2">
                                <p className="text-dark-grey">
                                    Дата и время приема
                                </p>
                                <input
                                    type="text"
                                    disabled
                                    className="input input-bordered w-full"
                                    value={`${getDayName(
                                        time.start,
                                    )}, ${getDate(time.start)}, ${getTime(
                                        time.start,
                                    )}`}
                                />
                            </div>
                        </div>
                        {!isUnregistred && (
                            <InitialBookingForm
                                appointmentData={appointmentData}
                                onUnregisterUserDetected={
                                    onUnregisterUserDetectedHandler
                                }
                            ></InitialBookingForm>
                        )}
                        {isUnregistred && (
                            <UnregistredBookingForm
                                appointmentData={appointmentData}
                                phoneNumber={unregisteredNumber}
                            ></UnregistredBookingForm>
                        )}
                    </div>
                </motion.div>
            </Background>
        </>
    );
};

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
`;

export default AppointmentModal;
