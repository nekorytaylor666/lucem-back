import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { Field, FieldProps } from "formik";

const RichTextEditor = (props: FieldProps) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
    ];

    return (
        <div className="text-editor">
            <ReactQuill
                className="textarea z-50 text-lg"
                theme="bubble"
                value={props.field.value}
                onChange={props.field.onChange(props.field.name)}
                modules={modules}
                formats={formats}
            ></ReactQuill>
        </div>
    );
};

export default RichTextEditor;
