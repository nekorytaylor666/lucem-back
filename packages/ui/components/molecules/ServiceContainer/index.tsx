import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  subTitle: string;
  imageUrl: string;
}

const ServiceContainer = ({ title, subTitle, imageUrl }: Props) => {
  return (
    <div className="flex flex-col rounded-lg shadow-2xl mb-10 space-y-5">
      <div className="flex-1 pt-8 px-5">
        <p className="text-lg">{title}</p>
        <p className="text-sm">{subTitle}</p>
      </div>
      <div className="flex flex-1 items-end">
        <Image width={377} height={377} src={imageUrl} className="" />
      </div>
    </div>
  );
};

export default ServiceContainer;
