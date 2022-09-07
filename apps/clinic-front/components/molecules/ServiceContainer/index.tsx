import React from "react";
import Link from "next/link";

interface Props {
    title: string;
    subTitle: string;
    imageUrl: string;
    url: string;
    exist: boolean;
}

const ServiceContainer = ({ title, subTitle, imageUrl, url, exist }: Props) => {
    return (
        <>
            {exist ? (
                <Link href={url}>
                    <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl lg:mb-10space-y-5 cursor-pointer">
                        <div className="flex-1 pt-4 lg:pt-8 p-4">
                            <p className="text-sm font-medium lg:text-lg text-black">
                                {title}
                            </p>
                            <p className="text-xs lg:text-sm text-black">
                                {subTitle}
                            </p>
                        </div>
                        <div className="flex flex-1 items-end">
                            <img
                                className=" lg:w-96 lg:h-96 mt-4"
                                src={imageUrl}
                            />
                        </div>
                    </div>
                </Link>
            ) : (
                <Link href={url}>
                    <div className="flex flex-col bg-gray-100 rounded-lg mb-10 space-y-5 cursor-pointer">
                        <div className="flex-1 pt-8 px-5">
                            <p className="text-lg text-gray-400">{title}</p>
                            <p className="text-sm text-gray-400">{subTitle}</p>
                        </div>
                        <div className="flex flex-1 items-end">
                            <img
                                style={{
                                    width: "377px",
                                    height: "377px",
                                    position: "static",
                                }}
                                src={imageUrl}
                            />
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default ServiceContainer;
