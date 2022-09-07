import React from "react";
import ServiceContainer from "components/molecules/ServiceContainer";

const ServicesContainer = () => {
    const ServiceInfo = [
        {
            id: 1,
            title: "Записаться на прием к терапевту",
            subTitle: "",
            imageUrl: "/icons/stethoscope.svg",
        },
        {
            id: 2,
            title: "Пройти диагностику",
            subTitle: "УЗИ органов всего тела",
            imageUrl: "/icons/UZI.svg",
        },
        {
            id: 3,
            title: "Записаться на удаленную консультацию",
            subTitle: "",
            imageUrl: "/icons/phone-consult.svg",
        },
        {
            id: 4,
            title: "Оформить справку",
            subTitle: "В школу, больничные листы, на медкомиссию",
            imageUrl: "/icons/documents.svg",
        },
    ];
    return (
        <div className="grid grid-cols-4 gap-4">
            {ServiceInfo.map((service) => {
                return (
                    <ServiceContainer
                        key={service.id}
                        title={service.title}
                        subTitle={service.subTitle}
                        imageUrl={service.imageUrl}
                    />
                );
            })}
        </div>
    );
};

export default ServicesContainer;
