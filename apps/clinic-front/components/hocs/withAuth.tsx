import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const withAuth = ({ children }) => {
    const router = useRouter();
    const { data: user } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/dashboard/signin");
            // The user is not authenticated, handle it here.
        },
    });
    if (!user?.accessToken) {
        return <>Authorizing...</>;
    }
    return <>{children}</>;
};

export default withAuth;
