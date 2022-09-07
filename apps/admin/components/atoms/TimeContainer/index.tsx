import React from "react";

interface PropsForTime {
    time: string;
    isBooked: boolean;
    show: boolean;
    setShow: any;
}

const TimeContainer = ({ time, isBooked, show, setShow }: PropsForTime) => {
    return (
        <div className="w-full">
            <button
                className={
                    isBooked
                        ? "flex w-full bg-pink-purple text-white justify-center py-2 px-6 rounded"
                        : "flex w-full bg-gray-100 text-gray-400 justify-center py-2 px-6 rounded"
                }
                onClick={() => {
                    setShow(!show);
                }}
            >
                {time}
            </button>
        </div>
    );
};
export default TimeContainer;
