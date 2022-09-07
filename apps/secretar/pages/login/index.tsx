import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/client";
import Layout from "components/template/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_SECRETARY } from "@services/graphql/queries/LoginDoctor";

const Login = () => {
    const router = useRouter();
    const [loginDoctor, { loading, error, data }] = useLazyQuery(
        LOGIN_SECRETARY,
        {
            onCompleted: (data) => {
                localStorage.setItem(
                    "DOCTOR_TOKEN",
                    data.loginAsSecretary.token,
                );
                localStorage.setItem(
                    "DOCTOR_ID",
                    data.loginAsSecretary.secretary._id,
                );
                router.push("/");
            },
        },
    );
    return (
        <div className="min-h-screen min-w-full bg-light-pink">
            <div className="container mx-auto py-8 h-screen flex justify-center items-center">
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
                        onSubmit={(data) => {
                            loginDoctor({
                                variables: {
                                    email: data.email,
                                    password: data.password,
                                },
                            });
                            // signIn("credentials", {
                            //     email: data.email,
                            //     password: data.password,
                            //     redirect: false,
                            // }).then((e) => {
                            //     if (e?.error) {
                            //         return alert(e?.error);
                            //     }
                            //     router.push(`/`);
                            // });
                        }}
                    >
                        <Form>
                            <LoginContainer className="p-8 rounded-2xl  flex flex-col items-center">
                                <h1 className="font-bold text-4xl mb-8">
                                    Вход в Lucem
                                </h1>
                                <label className="flex flex-col mb-4">
                                    <span className="text-lg">
                                        Телефон, почта или логин
                                    </span>
                                    <Field
                                        type="text"
                                        name="email"
                                        className="input px-4 py-1 w-96"
                                    ></Field>
                                </label>
                                <label className="flex flex-col mb-4">
                                    <span className="text-lg">Пароль</span>
                                    <Field
                                        type="password"
                                        className="input px-4 py-1 w-96"
                                        name="password"
                                    ></Field>
                                </label>
                                <LoginButton
                                    type="submit"
                                    className="w-96 text-white text-lg"
                                >
                                    {loading ? "Загрузка..." : "Войти"}
                                </LoginButton>
                            </LoginContainer>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

Login.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
};

Login.isPublic = true;

export default Login;

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
