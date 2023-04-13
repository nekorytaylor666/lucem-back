import React from "react";
import Image from "next/image";
import ImageGallery from "components/molecules/ImageGallery";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";

const MapNoSSR = dynamic(
    () => import("react-yandex-maps").then((mod) => mod.Map),
    { ssr: false },
);
const PlacemarkNoSSR = dynamic(
    () => import("react-yandex-maps").then((mod) => mod.Placemark),
    { ssr: false },
);
const YMapsNoSSR = dynamic(
    () => import("react-yandex-maps").then((mod) => mod.YMaps),
    { ssr: false },
);
const InformationContainer = () => {
    const imageGallery = [
        "/images/interior/cosmetology.jpg",
        "/images/interior/reception_room.jpg",
        "/images/interior/dr_room.jpg",
        "/images/interior/cafe.png",
    ];
    return (
        <div className="grid gap-4 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 ">
                <div className="bg-gray-100 p-4 lg:p-8 rounded-2xl space-y-6 col-start-1 col-end-2 text-sm mr-4">
                    <div className="space-y-2">
                        <p className="text-xl lg:text-4xl font-bold">
                            3 года заботы о вашем здаровье
                        </p>
                        <p>
                            Мы молодая клиника с современным подходом к лечению
                            и первоклассными специалистами
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-xl lg:text-4xl font-bold">
                                100+
                            </p>
                            <p>Практикующих врачей</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl lg:text-4xl font-bold">
                                3000+
                            </p>
                            <p>Клиентов ежемесячно</p>
                        </div>
                    </div>
                </div>
                {/* <div className="col-span-2 rounded-md">
                    <div className="relative w-full h-full rounded-md ">
                        <Image
                            width={1500}
                            height={800}
                            src="/icons/lucem-hall.svg"
                        />
                    </div>
                </div> */}
                <div className="hidden lg:block col-span-2 rounded-2xl overflow-hidden">
                    <ImageGallery imageUrls={imageGallery}></ImageGallery>
                </div>
            </div>
            {!isMobile && (
                <div className="hidden lg:block rounded-lg h-96 w-full m-4">
                    <YMapsNoSSR>
                        <div className="w-full rounded-l h-96">
                            <MapNoSSR
                                state={{
                                    center: [51.1426652, 71.4808272],
                                    zoom: 18,
                                }}
                                width="100%"
                                height="100%"
                            >
                                <PlacemarkNoSSR
                                    geometry={[51.1426652, 71.4808272]}
                                />
                            </MapNoSSR>
                        </div>
                    </YMapsNoSSR>
                </div>
            )}
            <div className="flex flex-col items-start gap-2 w-full py-4 px-4 lg:p-6 bg-gray-100 rounded-xl">
                <div className="flex flex-1 items-center">
                    <p className="text-xl lg:text-4xl font-bold">
                        Lucem всегда рядом
                    </p>
                </div>
                <div className="text-xs lg:text-base  flex flex-1 justify-center">
                    <div>
                        <p>Аманат 2, г.Нурсултан,</p>
                        <p>район Алматы, м-н Каратекель,</p>
                        <p>Почтовый индекс: Z00D5F4</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationContainer;
