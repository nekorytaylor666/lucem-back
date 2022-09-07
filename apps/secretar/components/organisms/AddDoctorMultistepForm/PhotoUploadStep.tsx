import { Field, useFormikContext } from "formik";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import { FormStepProps } from "./types";

const PhotoUploadStep: FC<FormStepProps> = ({ onNext, onPrev }) => {
    const { setFieldValue, values } = useFormikContext();
    const [file, setFile] = useState<string | ArrayBuffer | null>(null);
    useEffect(() => {
        const reader = new FileReader();
        const file = values.photoInfo.file;
        if (!file) {
            console.log("no file");
            return;
        }
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(reader.result);
        };
    }, [values.photoInfo.file]);
    return (
        <div className="space-y-3">
            <p>8. Фото</p>
            <div className="space-y-2">
                <div>
                    <p>Фото</p>
                    <input
                        id="file"
                        name="photoInfo.file"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            setFieldValue(
                                "photoInfo.file",
                                event.target.files[0],
                            );
                        }}
                    />
                </div>
            </div>
            <img src={file} />

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="py-3 px-5 bg-pink-purple text-white rounded"
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
};

export default PhotoUploadStep;
