'use client'
import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import {
    Box,
    Chip,
    CircularProgress,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import { ProfileBreifcaseIcon } from '@application/Molecules/icons/ProfileBreifcaseIcon'

import { ProfileDetailsWrapper, ProfileTextWrapper, StyledBox } from '../Discover/Discover.style'
import { singleDiscoverUserRequest } from '@store/Requests/SingleDiscoverUserRequest'
import { useEffect, useState } from 'react'
import { useFetch } from '@application/Hooks/useFetch'
import { ProfileLocationIcon } from '@application/Molecules/icons/ProfileLocationIcon'
import { ProfileSearchIcon } from '@application/Molecules/icons/ProfileSearchIcon'
import { CloseIcon } from '@application/Molecules/icons/CloseIcon'
import { Img, MainImgText } from './MyProfile.styled'

const getSingleUser = (setMyDetatils) => (data) => {
    if (data) setMyDetatils(data)
}

export const MyProfile = ({ user }) => {
    const [myDetatils, setMyDetatils] = useState(null)

    const { fetchRequest: singleUserRequest } = useFetch({
        request: singleDiscoverUserRequest(user?.id),
        onSuccess: getSingleUser(setMyDetatils),
    })

    useEffect(() => {
        singleUserRequest()
    }, [user?.id])

    if (!user?.id || !myDetatils) return null

    return (
        <AppLayout appMenu={USER_APP_MENU(true)} sidebarShow={true} hasLessSpace={true} userProfile={true}>
            {/* <ProfileDetailsWrapper sx={{ width: '100%', position: 'relative' }}> */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item sm={12}>
                    {/* <Grid container spacing={2} sx={{ overflowY: 'auto', maxWidth: `calc(100% - 280px)` }}> */}
                    <Stack direction="row">
                        {myDetatils?.images.length > 0 &&
                            myDetatils?.images.map((image, index) => (
                                <Box
                                    key={image._id}
                                    m={1.25}
                                    sx={{ position: 'relative' }}
                                    className="connection-wrapper"
                                >
                                    <IconButton sx={{ position: 'absolute', top: 0, right: 0, padding: 0.5 }}>
                                        <CloseIcon width={24} height={24} />
                                    </IconButton>
                                    <Img src={image.src} alt={image.alt} />
                                    {index === 0 && <MainImgText variant="body2">Main Image</MainImgText>}
                                </Box>
                            ))}
                    </Stack>
                    {/* </Grid> */}
                </Grid>
                <Grid item sm={12} sx={{ m: 1.25 }}>
                    <ProfileTextWrapper>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h4">
                                {myDetatils?.firstName}
                                <span>{myDetatils?.age}</span>
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
                            {myDetatils?.state && myDetatils?.city && (
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ pl: 0, pr: 0 }}>
                                        <ListItemIcon sx={{ minWidth: '35px' }}>
                                            <ProfileLocationIcon width={24} height={24} />
                                        </ListItemIcon>
                                        <ListItemText primary={`${myDetatils?.city}, ${myDetatils?.state}`} />
                                    </ListItemButton>
                                </ListItem>
                            )}

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
                                {myDetatils?.interests.map((interest) => (
                                    <Chip label={interest} key={interest} variant="outlined" />
                                ))}
                            </Stack>
                        </Box>
                    </ProfileTextWrapper>
                </Grid>
            </Grid>
            {/* </ProfileDetailsWrapper> */}
        </AppLayout>
    )
}
