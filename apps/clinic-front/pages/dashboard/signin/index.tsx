import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import router, { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import Layout from "components/template/Layout";
import { useMutation } from "@apollo/client";
import { SEND_VER_SMS, CHECK_SMS_VERIFICATION } from "graphql/mutations";
import { signIn } from "next-auth/react";
import InputMask from "react-input-mask";

const SignInPage = () => {
    const [smsCodeSent, setSmsCodeSent] = useState(false);
    const [sendVerSMS] = useMutation(SEND_VER_SMS, {
        onError: (err) => {
            console.log(err.message);
        },
        onCompleted: () => {
            setSmsCodeSent(true);
        },
    });

    const handleSendVerificationCode = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {};
    return (
        <div className="min-h-screen min-w-full bg-light-pink">
            <div className=" mx-auto py-8 h-screen flex justify-center items-center">
                <div className="flex justify-center items-center h-full flex-col">
                    <Image
                        width={240}
                        height={100}
                        src="/icons/lucem-logo.svg"
                    ></Image>
                    <div className="mb-8"></div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={async ({ email, password }) => {
                            signIn("credentials", {
                                email,
                                password,
                                callbackUrl: `${window.location.origin}/dashboard/`,
                            });
                            // if (smsCodeSent) {
                            //     await signIn("credentials", {
                            //         code,
                            //         phoneNumber,
                            //         callbackUrl: `${window.location.origin}/dashboard/`,
                            //     });
                            //     return false;
                            // }
                            // return handleSendVerificationCode({ phoneNumber });
                        }}
                    >
                        {({ handleSubmit, handleChange, values }) => (
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}
                            >
                                <LoginContainer className="w-full lg:w-xxl p-4 lg:p-8 rounded-2xl  flex flex-col items-center">
                                    <h1 className="font-bold text-xl text-center lg:text-3xl mb-8">
                                        Вход в Личный кабинет
                                    </h1>
                                    <label className="flex flex-col mb-4 w-full ">
                                        <span className="text-lg">Email</span>
                                        <Field
                                            type="text"
                                            className="input px-4 py-1 w-full"
                                            name="email"
                                        ></Field>
                                    </label>
                                    <label className="flex flex-col mb-4  w-full">
                                        <span className="text-lg">Пароль</span>
                                        <Field
                                            type="text"
                                            className="input px-4 py-1 w-full"
                                            name="password"
                                        ></Field>
                                    </label>
                                    <LoginButton
                                        type="submit"
                                        className={
                                            "w-full text-white text-lg transition-all ease-in-out duration-100" +
                                            " hover:bg-purple-700 hover:shadow-lg"
                                        }
                                    >
                                        Войти
                                    </LoginButton>
                                </LoginContainer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

SignInPage.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
};

SignInPage.isPublic = true;

export default SignInPage;

const LoginContainer = styled.div`
    box-shadow: 0px 6px 15px rgba(142, 24, 255, 0.15);
`;

const InputContainer = styled.input`
    background: #f8f6fb;
    /* Main/Purple */

    border: 2px solid #6900ce;
    box-sizing: border-box;
    border-radius: 6px;
    height: 50px;
`;

const LoginButton = styled.button`
    height: 50px;

    /* Link/Purple */

    background: #8e18ff;
    border-radius: 4px;
`;
