import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useAppointment } from "@recoil/hooks";
import { getDate, getTime } from "date-fns";
import { useFormik } from "formik";
import {
    CREATE_BOOKING,
    SEND_VER_SMS,
    CHECK_SMS_VERIFICATION,
} from "graphql/mutations";
import {
    CreateBooking,
    CreateBookingVariables,
} from "graphql/mutations/createBooking/__generated__/CreateBooking";
import { GET_SERVICE_BY_ID } from "graphql/queries/getServiceById";
import { GET_USER_BY_PHONE_NUMBER } from "graphql/queries/getUserByPhoneNumber/getUserByPhoneNumber";
import router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { getDayName } from "src/helper";
import InputMask from "react-input-mask";

const InitialBookingForm = ({ onUnregisterUserDetected, appointmentData }) => {
    const [token, setToken] = useState("");
    const { show, doctor, time } = appointmentData;
    const [loadingBooking, setLoadingBooking] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const initialValues = {
        phoneNumber: "",
        code: "",
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            sendVerSMS({ variables: { phoneNumber: values.phoneNumber } });
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
    const [getUserByPhoneNumber] = useLazyQuery(GET_USER_BY_PHONE_NUMBER, {
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
                onUnregisterUserDetected({
                    phoneNumber: formik.values.phoneNumber,
                });
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

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <p className="text-dark-grey">
                        Телефон для подтверждения записи
                    </p>
                    <InputMask
                        mask="+7 (999) 999-99-99"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        className="input input-bordered w-full"
                        placeholder="+7 ("
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                    />
                </div>
                {codeSent && (
                    <>
                        <div className="space-y-2">
                            <p className="text-dark-grey">Код подтверждения</p>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                placeholder=""
                                value={formik.values.code}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {loadingBooking ? (
                            <button
                                type="button"
                                disabled
                                className={
                                    "btn btn-disabled w-full btn-lg py-4"
                                }
                            >
                                Загрузка...
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={"btn btn-primary w-full btn-lg py-4"}
                                onClick={() => checkSMSVerification()}
                            >
                                Отправить код подтверждения
                            </button>
                        )}
                    </>
                )}
                {!codeSent && (
                    <button
                        type="button"
                        className={"btn btn-primary w-full btn-lg py-4"}
                        disabled={codeSent}
                        onClick={() => sendVerSMS()}
                    >
                        Отправить код подтверждения
                    </button>
                )}
            </form>
        </>
    );
};

export default InitialBookingForm;
