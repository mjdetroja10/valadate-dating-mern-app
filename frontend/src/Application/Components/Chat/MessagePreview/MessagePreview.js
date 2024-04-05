import { Fragment, useState } from 'react'
import { ChatWrapper, LeftSideMessage, RightSideMessage } from '../../Valadations/Valadations.style'
import { Button, List, ListItem, Popover, Typography } from '@mui/material'
import { DeleteIcon } from '@application/Molecules/icons/DeleteIcon'
import { EditIcon } from '@application/Molecules/icons/PencilIcon'

const handleClick = (setAnchorEl) => (event) => {
    setAnchorEl(event.currentTarget)
}

const handleClose = (setAnchorEl) => () => {
    setAnchorEl(null)
}

export const MessagePreview = (props) => {
    const { messages, handleDeleteMessage, handleEditMessage, fromUserId } = props

    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    return (
        <ChatWrapper>
            {messages.length > 0 ? (
                messages.map((msg) => (
                    <Fragment key={msg._id}>
                        {msg.senderId === fromUserId ? (
                            <Fragment>
                                <RightSideMessage onClick={handleClick(setAnchorEl)}>
                                    <Typography variant="body1">{msg.message}</Typography>
                                    {msg.isEdited && (
                                        <Typography variant="body2" align="right">
                                            edited
                                        </Typography>
                                    )}
                                </RightSideMessage>
                                <Popover
                                    id={open ? 'simple-popover' : undefined}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose(setAnchorEl)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    elevation={1}
                                >
                                    <List>
                                        <ListItem>
                                            <Button sx={{ color: 'blue.b700' }} onClick={handleDeleteMessage(msg._id)}>
                                                <DeleteIcon width={15} height={15} />{' '}
                                                <Typography variant="body2" ml={1}>
                                                    Remove
                                                </Typography>
                                            </Button>
                                        </ListItem>
                                        <ListItem>
                                            <Button sx={{ color: 'blue.b700' }} onClick={handleEditMessage(msg)}>
                                                <EditIcon width={15} height={15} />{' '}
                                                <Typography variant="body2" ml={1}>
                                                    Edit
                                                </Typography>
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Popover>
                            </Fragment>
                        ) : (
                            <LeftSideMessage>
                                <Typography variant="body1">{msg.message}</Typography>
                                {msg.isEdited && (
                                    <Typography variant="body2" align="right">
                                        edited
                                    </Typography>
                                )}
                            </LeftSideMessage>
                        )}
                    </Fragment>
                ))
            ) : (
                <Typography variant="body1" align="center" my={2}>
                    {"Let's start a conversation!"}
                </Typography>
            )}
        </ChatWrapper>
    )
}
