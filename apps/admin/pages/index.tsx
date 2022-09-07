import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MainPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/staff");
    }, []);

    return <div>index</div>;
};

export default MainPage;
