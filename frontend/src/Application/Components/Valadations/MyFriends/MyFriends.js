import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { MyFriendsListRequest } from '@store/Requests/MyFriendsListRequest'

export const MyFriends = ({ reloadMyFrds, setReloadMyFrds }) => {
    const router = useRouter()
    const [myFriendsList, setMyFriendsList] = useState(null)

    useEffect(() => {
        MyFriendsListRequest(setMyFriendsList)
    }, [])

    useEffect(() => {
        if (reloadMyFrds) {
            setReloadMyFrds(false)
            MyFriendsListRequest(setMyFriendsList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadMyFrds])

    return (
        <Grid item lg={12} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ color: 'blue.b700' }}>
                My Friends
            </Typography>
            <List>
                {myFriendsList &&
                    myFriendsList.map((friends) => (
                        <ListItem
                            disablePadding
                            key={friends?._id}
                            onClick={() => router.push(`valadations/${friends?.frd._id}`)}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* eslint-disable-next-line */}
                                    <img src={friends?.frd?.images[0]?.src} className="smallRoundImage" alt="" />
                                </ListItemIcon>
                                <ListItemText primary={`${friends?.frd?.firstName} ${friends?.frd?.lastName}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Grid>
    )
}

MyFriends.propTypes = {
    reloadMyFrds: PropTypes.bool,
    setReloadMyFrds: PropTypes.func,
}
