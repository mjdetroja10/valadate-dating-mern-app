import Image from 'next/image'
import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { STATUS } from '@application/Constants/DiscoverConstants'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { ProfileBreifcaseIcon } from '@application/Molecules/icons/ProfileBreifcaseIcon'
import { ProfileLocationIcon } from '@application/Molecules/icons/ProfileLocationIcon'
import { ProfileSearchIcon } from '@application/Molecules/icons/ProfileSearchIcon'
import { tokenDecoded } from '@application/Utils/TokenDecodeUtility'
import {
    Box,
    Chip,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import LikeIcon from '@public/assets/images/Like.svg'
import NotInterestedIcon from '@public/assets/images/Not_Interested.svg'
import { InterestRequest } from '@store/Requests/InterestRequest'
import { singleDiscoverUserRequest } from '@store/Requests/SingleDiscoverUserRequest'

import { ProfileActionWrapper, ProfileDetailsWrapper, ProfileTextWrapper, StyledBox } from '../Discover.style'

const profileActions = [
    {
        id: 1,
        src: LikeIcon,
        title: 'Interested',
        classname: 'actionBtn',
        status: STATUS.pending,
    },
    {
        id: 2,
        src: NotInterestedIcon,
        title: 'Not Interested',
        classname: 'actionBtn',
        status: STATUS.rejected,
    },
]

const loggedInUserDetails = tokenDecoded()

const interestSendDetails = (status, senderId, recieverId) => {
    return {
        senderId: senderId,
        recieverId: recieverId,
        status: status,
    }
}

const onSuccess = (setSelectedId, selectedId, setInterestPopup, interestPopup, setDiscoverDetails) => () => {
    if (selectedId) {
        setSelectedId(null)
        setDiscoverDetails((prev) => prev.filter((x) => x?._id !== selectedId))
    }

    setInterestPopup(!interestPopup)
}

export const ProfileDetails = (props) => {
    const {
        selectedId,
        setSelectedId,
        interestPopup,
        setInterestPopup,
        setDiscoverDetails,
        showPermanent = false,
    } = props

    const [userProfileDetails, setUserProfileDetails] = useState(null)

    useEffect(() => {
        singleDiscoverUserRequest(selectedId, setUserProfileDetails)
    }, [selectedId])

    const methods = useForm({})

    const { handleSubmit } = methods

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: InterestRequest,
        onError: () => {},
        onSuccess: onSuccess(setSelectedId, selectedId, setInterestPopup, interestPopup, setDiscoverDetails),
    })

    if (!selectedId) return null

    return (
        <ProfileDetailsWrapper>
            {!showPermanent && (
                <Box sx={{ mb: 3, textAlign: 'end' }}>
                    <ButtonPrimary onClick={() => setSelectedId(null)}>Close</ButtonPrimary>
                </Box>
            )}

            <Grid container spacing={2}>
                {userProfileDetails?.images.length > 0 && (
                    <Grid item lg={6} sm={12}>
                        <Fragment>
                            {/* {/ eslint-disable-next-line  /} */}
                            <img src={userProfileDetails?.images[0].src} alt="Profile Details Image" />
                        </Fragment>
                    </Grid>
                )}

                <Grid item lg={6} sm={12}>
                    <Grid container spacing={2}>
                        {userProfileDetails?.images.length > 1 &&
                            userProfileDetails?.images.slice(1).map((image) => (
                                <Fragment key={image?._id}>
                                    {
                                        <Grid item lg={userProfileDetails?.images.length == 2 ? 12 : 6} sm={12}>
                                            <img
                                                className={userProfileDetails?.images.length == 2 ? '' : 'smallerImage'}
                                                src={image.src}
                                                alt="Profile Details Image"
                                            />
                                        </Grid>
                                    }
                                </Fragment>
                            ))}
                    </Grid>
                </Grid>
                <Grid item lg={12} sm={12}>
                    <ProfileTextWrapper>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h4">
                                {userProfileDetails?.firstName}
                                <span>{userProfileDetails?.age}</span>
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                <CircularProgress size={40} variant="determinate" value={83} />
                                <StyledBox sx={{ top: '-4px' }}>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ color: 'black.main', fontWeight: 700 }}
                                    >
                                        {83}
                                    </Typography>
                                </StyledBox>
                            </Box>
                        </Box>

                        <List>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ pl: 0, pr: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '35px' }}>
                                        <ProfileLocationIcon width={24} height={24} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${userProfileDetails?.city}, ${userProfileDetails?.state}`}
                                    />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton sx={{ pl: 0, pr: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '35px' }}>
                                        <ProfileSearchIcon width={24} height={24} />
                                    </ListItemIcon>
                                    <ListItemText primary="Long-Term Partner" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton sx={{ pl: 0, pr: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '35px' }}>
                                        <ProfileBreifcaseIcon width={24} height={24} />
                                    </ListItemIcon>
                                    <ListItemText primary="Architect" />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <Box>
                            <Typography variant="body1" sx={{ color: 'blue.b700', mb: 3 }}>
                                Interests
                            </Typography>
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                {userProfileDetails?.interests.map((interest) => (
                                    <Chip label={interest} key={interest} variant="outlined" />
                                ))}
                            </Stack>
                        </Box>

                        {!showPermanent && (
                            <ProfileActionWrapper>
                                <FormProvider {...methods}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        useFlexGap
                                        flexWrap="wrap"
                                        justifyContent="space-around"
                                    >
                                        {profileActions.map((action) => (
                                            <Box
                                                component="button"
                                                key={action?.id}
                                                className={action.classname}
                                                onClick={() =>
                                                    handleSubmit(
                                                        formSubmit(
                                                            interestSendDetails(
                                                                action?.status,
                                                                loggedInUserDetails?.id,
                                                                userProfileDetails?._id
                                                            )
                                                        )
                                                    )
                                                }
                                                disabled={formLoading}
                                            >
                                                <Image src={action?.src} alt="Icon" />
                                                <Typography variant="body1">{action?.title}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </FormProvider>
                            </ProfileActionWrapper>
                        )}
                    </ProfileTextWrapper>
                </Grid>
            </Grid>
        </ProfileDetailsWrapper>
    )
}

ProfileDetails.propTypes = {
    selectedId: PropTypes.string,
    setSelectedId: PropTypes.func,
    setDiscoverDetails: PropTypes.func,
    setInterestPopup: PropTypes.func,
    interestPopup: PropTypes.bool,
    showPermanent: PropTypes.bool,
}
