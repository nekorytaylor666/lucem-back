import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import client from "src/apollo/apollo-client";
import { gql } from "@apollo/client";

const providers = [];

const callbacks = {
    async jwt(token, user) {
        if (user) {
            token.accessToken = user.token;
        }

        return token;
    },

    async session(session, token) {
        session.accessToken = token.accessToken;

        return session;
    },
};

const options = {
    providers,
    callbacks,
};

const nextAuthOptions = (req, res) => {
    return {
        providers: [
            // CredentialsProvider({
            //     async authorize(credentials) {
            //         try {
            //             const response = await axios.post("/api/login", {
            //                 username: credentials.username,
            //                 password: credentials.password,
            //             });

            //             const cookies = response.headers["set-cookie"];

            //             res.setHeader("Set-Cookie", cookies);

            //             return response.data;
            //         } catch (error) {
            //
            //             throw Error(error.response);
            //         }
            //     },
            // }),
            Providers.Credentials({
                name: "Credentials",
                authorize: async (credentials) => {
                    try {
                        const { data } = await client.query({
                            query: gql`
                                query LoginDoctor(
                                    $email: String!
                                    $password: String!
                                ) {
                                    loginDoctor(
                                        email: $email
                                        password: $password
                                    ) {
                                        doctor {
                                            _id
                                        }
                                        token
                                    }
                                }
                            `,
                            variables: {
                                email: credentials.email,
                                password: credentials.password,
                            },
                        });
                        const user = data?.loginDoctor;
                        if (user) {
                            return user;
                        } else {
                            return null;
                        }
                    } catch (error) {
                        console.log("error:", JSON.stringify(error));
                        throw new Error("Почта или пароль неверны.");
                    }
                },
                session: {
                    strategy: "jwt",
                    maxAge: 30 * 24 * 60 * 60, // 30 days
                },
            }),
        ],
        callbacks,
    };
};

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};
