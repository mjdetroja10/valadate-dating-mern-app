import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'

import {
    Box,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material'
import { MyFriendsListRequest } from '@store/Requests/MyFriendsListRequest'
import { useFetch } from '@application/Hooks/useFetch'

const getMyFriends = (setFriends, setNewMatches) => (data) => {
    setFriends(data)
    setNewMatches && setNewMatches(data)
}

const getDifferenceTime = (date) => {
    let currentDate = new Date()
    let messageDate = new Date(date)
    let oneMinute = 60 * 1000

    const miliSecDiff = Math.abs(currentDate - messageDate)
    const minutesDiff = Math.floor(miliSecDiff / oneMinute)
    const hoursDiff = Math.floor(minutesDiff / 60)
    const daysDiff = Math.ceil(hoursDiff / 24)
    const weeksDiff = Math.floor(daysDiff / 7)

    return { minutesDiff, hoursDiff, daysDiff, weeksDiff, messageDate, oneMinute }
}

const updateCount = (time, setCount) => {
    setInterval(() => {
        setCount((prev) => prev + 1)
    }, time)
}

const getMessageDays = (daysDiff, weeksDiff, messageDate) => {
    if (daysDiff === 0) return 'Today'
    if (daysDiff === 1) return 'yesterday'
    if (daysDiff < 7) return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`
    if (daysDiff < 30) return `${weeksDiff} week${weeksDiff > 1 ? 's' : ''} ago`
    else return messageDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export const MyFriends = ({ title = '', reloadMyFrds = false, setReloadMyFrds, setNewMatches }) => {
    const router = useRouter()
    const [myFriendsList, setMyFriendsList] = useState(null)

    const [count, setCount] = useState(0)

    const { fetchRequest, loading } = useFetch({
        request: MyFriendsListRequest,
        onSuccess: getMyFriends(setMyFriendsList, setNewMatches),
    })

    useEffect(() => {
        fetchRequest()
    }, [])

    useEffect(() => {
        if (reloadMyFrds) {
            setReloadMyFrds(false)
            fetchRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadMyFrds])

    const getMessageDate = useCallback(
        (date) => {
            if (!date) return null

            const { minutesDiff, hoursDiff, daysDiff, weeksDiff, messageDate, oneMinute } = getDifferenceTime(date)

            if (minutesDiff < 5) {
                // update only in time less than 5 minutes
                updateCount(oneMinute, setCount)
                return 'now'
            }
            if (minutesDiff <= 60) {
                updateCount(oneMinute, setCount)
                return minutesDiff + ' minutes ago'
            }
            if (hoursDiff >= 1 && hoursDiff < 24) {
                updateCount(60 * oneMinute, setCount)
                return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`
            }

            updateCount(60 * oneMinute * 24, setCount)

            return getMessageDays(daysDiff, weeksDiff, messageDate)
        },
        [count]
    )

    return (
        <Grid item lg={12} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ color: 'blue.b700' }}>
                {title}
            </Typography>
            <List>
                {loading ? (
                    <ListItem lg={12} sx={{ justifyContent: 'center' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress sx={{ color: 'blue.b700' }} />
                        </Box>
                    </ListItem>
                ) : myFriendsList && myFriendsList.length > 0 ? (
                    myFriendsList.map((friends) => {
                        if (!friends?.frd) return null
                        const { frd } = friends

                        return (
                            <ListItem
                                disablePadding
                                key={friends?._id}
                                onClick={() => router.push(`valadations/${frd._id}`)}
                                secondaryAction={getMessageDate(frd?.message?.createdAt)}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        {/* eslint-disable-next-line */}
                                        <img src={frd?.images[0]?.src} className="smallRoundImage" alt="" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${frd?.firstName} ${frd?.lastName}`}
                                        secondary={frd?.message?.message}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                ) : (
                    <ListItem disablePadding sx={{ justifyContent: 'center' }}>
                        <Typography>No friends available</Typography>
                    </ListItem>
                )}
            </List>
        </Grid>
    )
}

MyFriends.propTypes = {
    title: PropTypes.string,
    reloadMyFrds: PropTypes.bool,
    setReloadMyFrds: PropTypes.func,
}
