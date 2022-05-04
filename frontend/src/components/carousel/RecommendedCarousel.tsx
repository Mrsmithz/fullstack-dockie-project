import type { NextPage } from 'next'
import React, { useEffect, useState, useRef } from "react"
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    HStack,
    Avatar,
    useColorModeValue,
    Button,
    useColorMode,
    Spinner,
    Flex,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
} from '@chakra-ui/react';
import RecommendedCard from "../card/RecommendedCard"

import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

const headerMargin = { base: 0, md: 0, lg: 6, xl: 8 };

const RecommendedCarousel: NextPage<{ data: any }> = ({ data }) => {
    const swiperRef = useRef(null) as any
    return (
        <Box w={'100%'} mb={10}>
            <Text fontSize={'1.8rem'} color={'snow'} ml={headerMargin}>Recommended</Text>
            <Swiper
                onBreakpoint={(e) => {
                    if (e.currentBreakpoint === '320') {
                        $('.swiper-button-prev,.swiper-button-next').hide();
                        $('.swiper-pagination,.swiper-pagination-clickable,.swiper-pagination-bullets,.swiper-pagination-horizontal').show();
                    } else {
                        $('.swiper-button-prev,.swiper-button-next').show();
                        $('.swiper-pagination,.swiper-pagination-clickable,.swiper-pagination-bullets,.swiper-pagination-horizontal').hide();
                    }

                }}
                onInit={(core: SwiperCore) => {
                    swiperRef.current = core.el
                }}
                // spaceBetween={10}
                // centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="mySwiper"
                slidesPerView={3}
                breakpoints={{
                    320 : {
                        slidesPerView: 1,
                    },
                    720: {
                        slidesPerView: 1,
                    },
                    980: {
                        slidesPerView: 2,
                    },
                    1725: {
                        slidesPerView: 3,
                    },
                    2500: {
                        slidesPerView: 4,
                    }
                }}
            >
                {data?.map((card: any, index: number) => {
                    return (
                        <SwiperSlide
                            key={index}
                            style={{ width: '100%', textAlign: 'center' }}
                            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
                            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
                        ><RecommendedCard item={card} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}

export default RecommendedCarousel