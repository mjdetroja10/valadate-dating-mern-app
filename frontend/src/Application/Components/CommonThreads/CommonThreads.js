'use client'

import Image from 'next/image'
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { Box, Container, Grid, Typography } from '@mui/material'
import PlaceHolderImageFemale from '@public/assets/images/slider.png'

import 'swiper/css'
import 'swiper/css/navigation'

import { CommonThreadsMainWrap as Wrapper } from './CommonThreads.style'

const slides = [
    {
        id: 1,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 2,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 3,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 4,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 5,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 6,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 7,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 8,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 9,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
    {
        id: 10,
        imgsrc: PlaceHolderImageFemale,
        name: 'Amanda Smith',
        threads: '7 Extended Threads',
    },
]

export const CommonThreads = () => {
    return (
        <AppLayout appMenu={USER_APP_MENU}>
            <Wrapper>
                <Container maxWidth={false} disableGutters>
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <Typography variant="h4">Your Friends</Typography>

                            <Swiper
                                modules={[Navigation, A11y]}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                spaceBetween={20}
                                slidesPerView={8}
                                centeredSlides={true}
                                loop={true}
                            >
                                {slides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <Box>
                                            <Image src={slide.imgsrc} alt="Profile Details Image" />
                                            <Box className="cardContent">
                                                <Typography variant="body2">{slide.name}</Typography>
                                                <Typography variant="body3">{slide.threads}</Typography>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Grid>
                    </Grid>
                </Container>
            </Wrapper>
        </AppLayout>
    )
}
