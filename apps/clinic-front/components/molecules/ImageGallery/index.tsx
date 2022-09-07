import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
import "swiper/swiper-bundle.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import "swiper/components/thumbs/thumbs.min.css";
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper";
import Image from "next/image";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

const ImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className="w-full">
            <Swiper
                style={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Unreachable code error
                    "--swiper-navigation-color": "purple",
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Unreachable code error
                    "--swiper-pagination-color": "#fff",
                    height: 500,
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2 w-full mb-4 rounded-2xl"
            >
                {imageUrls.map((image, index) => (
                    <SwiperSlide>
                        <Image
                            layout="fill"
                            className="w-full rounded-2xl"
                            src={image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                className="mySwiper w-full h-32 rounded-2xl"
            >
                {imageUrls.map((image, index) => (
                    <SwiperSlide>
                        <Image
                            width={200}
                            height={200}
                            className="w-full"
                            src={image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageGallery;
