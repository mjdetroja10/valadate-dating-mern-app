'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { Alert, Box, CircularProgress, Container, Grid, Snackbar } from '@mui/material'
import { getDiscoverListRequest } from '@store/Requests/GetDiscoverListRequest'

import { DiscoverMainWrap as Wrapper, YellowBackgroundWrapper } from './Discover.style'
import { ProfileDetails } from './ProfileDetails/ProfileDetails'
import { UserCardComponent } from './UserCard/UserCardComponent'

const pageLimit = 20

const handleAlertClose = (setInterestPopup, interestPopup) => () => {
    setInterestPopup(!interestPopup)
}

export const Discover = () => {
    const [discoverDetails, setDiscoverDetails] = useState([])

    const [selectedId, setSelectedId] = useState(null)

    const [hasMore, setHasMore] = useState(true)

    const [page, setPage] = useState(1)

    const [interestPopup, setInterestPopup] = useState(false)

    const elemRef = useRef(null)

    const onInterSection = useCallback(
        (e) => {
            const firstEntry = e[0]

            if (firstEntry.isIntersecting && hasMore) {
                getDiscoverListRequest(setDiscoverDetails, { pageSize: pageLimit, page: page }, setHasMore)
                setPage((prev) => prev + 1)
            }
        },
        [hasMore, page]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(onInterSection)

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

    return (
        <AppLayout appMenu={USER_APP_MENU}>
            <Wrapper>
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
                        <Grid item lg={selectedId ? 6 : 12}>
                            <YellowBackgroundWrapper>
                                <Grid container spacing={2}>
                                    <UserCardComponent
                                        discoverDetails={discoverDetails}
                                        selectedId={selectedId}
                                        setSelectedId={setSelectedId}
                                    />
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
            </Wrapper>
        </AppLayout>
    )
}
