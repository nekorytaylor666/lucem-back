import Link from "next/link";
import { FC } from "react";
import { FormStepProps } from "./types";

export const HobbyInfo: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>8. Хобби</p>
            <p className="text-gray-400">
                Заполнить информацию о хобби врач может сам в своем личном
                кабинете.
            </p>
            <div className="space-y-2">
                <div>
                    <p className="text-xl">Первый</p>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Язык"
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="py-3 px-5 border border-pink-purple text-pink-purple rounded"
                >
                    Назад
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="py-3 px-5 bg-pink-purple text-white rounded"
                >
                    Завершить регистрацию
                </button>
            </div>
        </div>
    );
};
