'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { Alert, Box, CircularProgress, Container, Grid, Snackbar, useMediaQuery } from '@mui/material'
import { getDiscoverListRequest } from '@store/Requests/GetDiscoverListRequest'

import { YellowBackgroundWrapper } from './Discover.style'
import { ProfileDetails } from './ProfileDetails/ProfileDetails'
import { UserCardComponent } from './UserCard/UserCardComponent'
import theme from '@application/Themes'

import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/navigation'

const pageLimit = 20

const handleAlertClose = (setInterestPopup, interestPopup) => () => {
    setInterestPopup(!interestPopup)
}

export const Discover = ({ token }) => {
    const [discoverDetails, setDiscoverDetails] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [interestPopup, setInterestPopup] = useState(false)

    const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

    const elemRef = useRef(null)

    const onInterSection = useCallback(
        (e) => {
            console.log(e, 'e')
            const firstEntry = e[0]

            console.log(firstEntry, 'firstEntry')

            if (firstEntry.isIntersecting && hasMore) {
                getDiscoverListRequest(setDiscoverDetails, { pageSize: pageLimit, page: page }, setHasMore)
                setPage((prev) => prev + 1)
            }
        },
        [hasMore, page]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(onInterSection)

        console.log(observer, 'observer')

        if (observer && elemRef.current) {
            observer.observe(elemRef.current)
        }
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discoverDetails])

    useEffect(() => {
        if (isMobileSize && hasMore) {
            getDiscoverListRequest(setDiscoverDetails, { pageSize: pageLimit, page: page }, setHasMore)
            setPage((prev) => prev + 1)
        }
    }, [isMobileSize])

    console.log(discoverDetails, 'discoverDetails')

    return (
        <AppLayout appMenu={USER_APP_MENU()} sidebarShow={true} hasLessSpace={true}>
            {interestPopup && (
                <Snackbar
                    open={interestPopup}
                    autoHideDuration={4000}
                    onClose={handleAlertClose(setInterestPopup, interestPopup)}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                        onClose={handleAlertClose(setInterestPopup, interestPopup)}
                    >
                        Interest has been sent successfully!
                    </Alert>
                </Snackbar>
            )}
            <Container maxWidth={false} disableGutters>
                {/* Main Row */}
                <Grid container spacing={2}>
                    {/* Main Col-6 */}
                    {isMobileSize && !selectedId ? (
                        // <Grid item xs={12}>
                        <Swiper
                            modules={[Navigation, A11y]}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            spaceBetween={20}
                            slidesPerView={1}
                            centeredSlides={true}
                            loop={true}
                            allowSlidePrev={false}
                            // allowSlideNext: true,
                            className="mySwiper"
                            prevButtonText=" "
                            nextButtonText=" "
                        >
                            {console.log('111111111111111111')}
                            {discoverDetails.map((user) => (
                                <SwiperSlide key={user?._id}>
                                    {console.log(user, 'user')}
                                    <UserCardComponent
                                        user={user}
                                        selectedId={selectedId}
                                        setSelectedId={setSelectedId}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : // </Grid>
                    !isMobileSize ? (
                        <Grid item lg={selectedId ? 6 : 12} xs={12}>
                            <YellowBackgroundWrapper>
                                <Grid container spacing={2}>
                                    {discoverDetails.map((user) => (
                                        <UserCardComponent
                                            selectedId={selectedId}
                                            setSelectedId={setSelectedId}
                                            user={user}
                                            key={user?._id}
                                        />
                                    ))}
                                    {hasMore && (
                                        <Grid item lg={12}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <CircularProgress ref={elemRef} sx={{ color: 'blue.b700' }} />
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </YellowBackgroundWrapper>
                        </Grid>
                    ) : (
                        ''
                    )}

                    {/* Main Col-6 */}
                    {selectedId && (
                        <Grid item lg={6} sm={12}>
                            <ProfileDetails
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                setInterestPopup={setInterestPopup}
                                interestPopup={interestPopup}
                                setDiscoverDetails={setDiscoverDetails}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </AppLayout>
    )
}
