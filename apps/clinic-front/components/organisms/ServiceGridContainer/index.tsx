import React from "react";

import { Service } from "custom_typings/service";

interface ServiceGridProps {
    services: Service[];
}

const ServiceGridContainer = ({ services }: ServiceGridProps) => {
    return (
        <div className="container p-8">
            <div className="text-4xl font-bold mb-8">
                <div className="space-y-8 space-x-8">
                    {services.map((service, index: number) => (
                        <ServiceContainer key={index} service={service} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceGridContainer;

const ServiceContainer = (props: { service: Service }) => {
    const { service } = props;
    return (
        <div className="flex flex-col rounded-lg shadow-sm space-y-8 flex-start bg-light-grey w-1/2 p-8">
            <div className="text-6xl font-normal py-4 px-6 self-start">
                {service.name}
            </div>
            <div className="flex flex-row shadow-lg p-8 w-1/2">
                {service.description}
            </div>
            <div className="p-8 space-x-24 flex flex-row justify-between">
                <button className="bg-light-grey h-16 p-4 rounded-xl text-pink-purple hover:bg-pink-purple hover:text-light-grey">
                    Записаться
                </button>
                <div className="text-6xl font-bold">{service.price}</div>
            </div>
        </div>
    );
};
