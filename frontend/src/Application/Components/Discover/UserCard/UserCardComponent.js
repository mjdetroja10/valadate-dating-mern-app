import Link from 'next/link'
import PropTypes from 'prop-types'

import { DISCOVER_URL } from '@application/Constants/RoutesConstants'
import { userDetails } from '@application/Utils/TokenDecodeUtility'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'

import { StyledBox, UserCard, UserCardText } from '../Discover.style'

const calculateMatchingPercentage = (userInterests, loggedInUserInterests) => {
    const commonInterests = loggedInUserInterests.filter((interest) => userInterests.includes(interest))

    const matchingPercentage =
        (commonInterests.length / (loggedInUserInterests.length + userInterests.length - commonInterests.length)) * 100

    return Math.round(matchingPercentage)
}

export const UserCardComponent = ({ selectedId, setSelectedId, user }) => {
    const loginUserInterests = userDetails()

    const loggedInUserInterests = loginUserInterests?.interests

    if (!user) return null

    // return discoverDetails.map((user) => {
    return (
        <Grid item lg={selectedId ? 6 : 2} sm={12}>
            <UserCard onClick={() => setSelectedId(user?._id)}>
                {/* eslint-disable-next-line  */}
                <img src={user?.images[0].src} alt={user?.images[0].alt} />

                <Typography variant="h5">
                    <Link href={DISCOVER_URL}> View Profile </Link>
                </Typography>
                <UserCardText>
                    <Box>
                        <Typography variant="body1">
                            {user.firstName} {user.lastName} <span> {user?.age} </span>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white.main' }}>
                            {user.interests.length} Shared Interests
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            50+ Common Threads
                        </Typography>
                    </Box>

                    <Box sx={{ position: 'relative' }}>
                        <CircularProgress
                            size={40}
                            variant="determinate"
                            value={calculateMatchingPercentage(user.interests, loggedInUserInterests)}
                        />
                        <StyledBox sx={{ top: 6 }}>
                            <Typography variant="body2" component="div" sx={{ color: 'white.main' }}>
                                {calculateMatchingPercentage(user.interests, loggedInUserInterests) || ''}
                            </Typography>
                        </StyledBox>
                    </Box>
                </UserCardText>
            </UserCard>
        </Grid>
    )
    // })
}

UserCardComponent.propTypes = {
    discoverDetails: PropTypes.array,
}
