import { NotificationIcon } from '@application/Molecules/icons/NotificationIcon'
import { IconButton, List, ListItem, Popover, Typography } from '@mui/material'
import { Fragment, useState } from 'react'

export const Notification = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    return (
        <Fragment>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <NotificationIcon height={38} width={38} />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                elevation={1}
            >
                <List>
                    <ListItem>
                        <Typography sx={{ p: 2 }}>The content of the Popover 1111.</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography sx={{ p: 2 }}>The content of the Popover 2222.</Typography>
                    </ListItem>{' '}
                    <ListItem>
                        <Typography sx={{ p: 2 }}>The content of the Popover 3333.</Typography>
                    </ListItem>
                </List>
            </Popover>
        </Fragment>
    )
}
