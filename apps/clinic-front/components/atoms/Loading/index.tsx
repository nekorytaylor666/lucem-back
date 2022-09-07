import React from "react";
import Loader from "react-loader-spinner";

interface LoaderOptions {
    color: string;
    width: number;
    height: number;
    visible: boolean;
}

const Loading = ({ color, width, height, visible }: LoaderOptions) => {
    return (
        <>
            <Loader
                type="TailSpin"
                color={color}
                width={width}
                height={height}
                visible={visible}
            />
        </>
    );
};
export default Loading;
