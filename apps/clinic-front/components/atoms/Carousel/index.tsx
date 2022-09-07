import React from "react";
import { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from "react-device-detect";
const Carousel: React.FC = ({ children }) => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={isMobile ? 1 : 3}
            style={{ padding: "2rem ", height: "500px", cursor: "grabbing" }}
        >
            {children}
        </Swiper>
    );
};

export default Carousel;
