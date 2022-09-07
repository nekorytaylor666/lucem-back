import React from "react";

interface PropsForTime {
  time: string;
  isBooked: boolean;
  setDoctor: () => void;
  setTime: () => void;
  setShow: () => void;
  value: string;
  isPicked: boolean;
  onChange: (time: string) => void;
}

const TimeContainer = ({
  time,
  isBooked,
  setDoctor,
  setTime,
  setShow,
  onChange,
  value,
  isPicked,
}: PropsForTime) => {
  return (
    <div className="w-full">
      <button
        type="button"
        className={
          isBooked || isPicked
            ? "flex w-full bg-pink-purple text-white justify-center py-2 px-6 rounded"
            : "flex w-full bg-gray-100 text-gray-400 justify-center py-2 px-6 rounded"
        }
        onClick={() => {
          if (isBooked) {
            alert("На это время уже есть запись");
            return;
          }
          setTime();
          setDoctor();
          setShow();
          onChange(time);
        }}
      >
        {time}
      </button>
    </div>
  );
};
export default TimeContainer;
