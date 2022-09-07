import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_ADMIN } from "graphql/query";
import { NextPage } from "next";

const Login = () => {
    const router = useRouter();
    const [doctor, setDoctor] = useState({
        email: "",
        password: "",
    });
    console.log(doctor.password);
    const [loginAdmin, loading] = useLazyQuery(LOGIN_ADMIN, {
        variables: {
            email: doctor.email,
            password: doctor.password,
        },
        onCompleted: (data) => {
            localStorage.setItem("JWT", data.loginAdmin.token);
            router.push("/staff?route=staff-doctors");
        },
        onError: (data) => {
            alert(data);
        },
    });
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
                    <LoginContainer className="p-8 rounded-2xl  flex flex-col items-center">
                        <h1 className="font-bold text-4xl mb-8">
                            Вход в Lucem
                        </h1>
                        <label className="flex flex-col mb-4">
                            <span className="text-lg">
                                Телефон, почта или логин
                            </span>
                            <InputContainer
                                value={doctor.email}
                                type="email"
                                className="px-4 py-1 w-96"
                                onChange={(event) =>
                                    setDoctor((prevState) => ({
                                        ...prevState,
                                        email: event.target.value,
                                    }))
                                }
                            ></InputContainer>
                        </label>
                        <label className="flex flex-col mb-4">
                            <span className="text-lg">Пароль</span>
                            <InputContainer
                                value={doctor.password}
                                type="password"
                                className="px-4 py-1 w-96"
                                onChange={(event) =>
                                    setDoctor((prevState) => ({
                                        ...prevState,
                                        password: event.target.value,
                                    }))
                                }
                            ></InputContainer>
                        </label>
                        <LoginButton
                            onClick={() => loginAdmin()}
                            className="w-96 text-white text-lg"
                        >
                            Войти
                        </LoginButton>
                    </LoginContainer>
                    <div className="flex justify-between items-center w-full mt-4">
                        <button className="text-purple-500 text-lg">
                            Вход по СМС
                        </button>
                        <button className="text-purple-500 text-lg">
                            Забыли пароль?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.getLayout = (page: NextPage) => page;

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
