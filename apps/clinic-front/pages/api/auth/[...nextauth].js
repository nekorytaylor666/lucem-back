import { CHECK_SMS_VERIFICATION } from "graphql/mutations/checkSMSVerification";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "src/apollo/apollo-client";

const providers = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            phoneNumber: {
                label: "phoneNumber",
                type: "text",
            },
            code: { label: "code", type: "text" },
        },
        async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            const phoneNumber = credentials?.phoneNumber;
            const code = credentials?.code;
            try {
                const checkSmsRes = await client.mutate({
                    mutation: CHECK_SMS_VERIFICATION,
                    variables: {
                        phoneNumber,
                        code,
                    },
                });
                const user = checkSmsRes.data?.checkSMSVerificationCode;
                if (user) {
                    return user;
                } else {
                    return null;
                }
            } catch (error) {
                return null;
            }
        },
        session: {
            strategy: "jwt",
            maxAge: 30 * 24 * 60 * 60, // 30 days
        },
    }),
];

const callbacks = {
    async jwt({ token, user }) {
        if (user) {
            token.accessToken = user.token;
            token._id = user._id;
        }

        return token;
    },

    async session({ session, token }) {
        session.accessToken = token.accessToken;
        session._id = token._id;
        return session;
    },
};

const options = {
    providers,
    callbacks,
    secret: process.env.NEXT_AUTH_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
