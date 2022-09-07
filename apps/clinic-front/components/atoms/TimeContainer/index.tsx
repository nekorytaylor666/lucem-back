import React from "react";

interface PropsForTime {
    time: string;
    isBooked: boolean;
    setDoctor: () => void;
    setTime: () => void;
    setShow: () => void;
}

const TimeContainer = ({
    time,
    isBooked,
    setDoctor,
    setTime,
    setShow,
}: PropsForTime) => {
    return (
        <div className="w-full">
            <button
                type="button"
                className={
                    isBooked
                        ? "flex w-full bg-gray-100 text-gray-400 justify-center py-2 px-6 rounded"
                        : "flex w-full bg-pink-purple text-white justify-center py-2 px-6 rounded"
                }
                onClick={() => {
                    if (isBooked) {
                        alert("На это время уже есть запись");
                        return;
                    }
                    setTime();
                    setDoctor();
                    setShow();
                }}
            >
                {time}
            </button>
        </div>
    );
};
export default TimeContainer;
