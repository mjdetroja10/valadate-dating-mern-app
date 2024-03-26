'use client'

import { useParams } from 'next/navigation'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import * as yup from 'yup'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { AppLayout } from '@application/Layouts/AppLayout'
import { SendIcon } from '@application/Molecules/icons/SendIcon'
import { tokenDecoded } from '@application/Utils/TokenDecodeUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Grid, List, ListItem, Menu, Popover, Typography } from '@mui/material'

import { ChatWrapper, LeftSideMessage, StyledList, RightSideMessage, ValadationsMainWrap } from '../Valadations.style'
import { GetMessagesRequest } from '@store/Requests/GetMessagesRequest'
import { SendMessageRequest } from '@store/Requests/SendMessageRequest'
import { ProfileDetails } from '@application/Components/Discover/ProfileDetails/ProfileDetails'
import { useFetch } from '@application/Hooks/useFetch'
import { DeleteIcon } from '@application/Molecules/icons/DeleteIcon'
import { DeleteMessageRequest } from '@store/Requests/DeleteMessageRequest'
import { EditIcon } from '@application/Molecules/icons/PencilIcon'
import { EditMessageRequest } from '@store/Requests/EditMessageRequest'

const sendMsgValidator = yup.object().shape({
    message: yup.string().required(),
})

const getMessages = (sendMessage) => (data) => {
    sendMessage(data)
}

const handleClick = (setAnchorEl) => (event) => {
    setAnchorEl(event.currentTarget)
}

const handleClose = (setAnchorEl) => () => {
    setAnchorEl(null)
}

const deleteMessage = (setMessages, id, socket, userId) => async () => {
    setMessages((prev) => prev.filter((x) => x._id !== id))

    const data = await DeleteMessageRequest(id)

    socket.current.emit('delete-msg', { userId, msgId: id })
}

const editMessage = (msg, setValue, setActiveId) => async () => {
    setValue('message', msg.message)
    setActiveId(msg)
}

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [activeId, setActiveId] = useState('')
    const { id } = useParams()
    const socket = useRef()
    const fromUserId = tokenDecoded()?.id
    const { fetchRequest } = useFetch({
        request: GetMessagesRequest(id),
        onSuccess: getMessages(setMessages),
    })

    const methods = useForm({
        defaultValues: { message: '' },
        resolver: yupResolver(sendMsgValidator),
    })

    const { handleSubmit, reset, setValue } = methods

    useEffect(() => {
        if (fromUserId) {
            socket.current = io(process.env.NEXT_PUBLIC_APP_API)
            socket.current.emit('add-user', fromUserId)

            return () => {
                socket.current.disconnect()
            }
        }
    }, [fromUserId])

    useEffect(() => {
        if (socket.current) {
            socket.current.on('receive-message', (data) => {
                setMessages((prevMessages) => [...prevMessages, data])
            })

            socket.current.on('delete-data', (data) => {
                setMessages((prevMessages) => prevMessages.filter((x) => x._id !== data.msgId))
            })

            socket.current.on('edit-data', (data) => {
                setMessages((prevMessages) =>
                    prevMessages.map((x) =>
                        x._id === data._id ? { ...x, message: data.message, isEdited: data.isEdited } : x
                    )
                )
            })
        }
    }, [socket])

    const sendMessage = async ({ message }) => {
        if (!message || message.trim() === '') return null

        if (activeId) {
            const edit = await EditMessageRequest({ id: activeId._id, message })

            setMessages((prevMessages) =>
                prevMessages.map((x) => (x._id === activeId._id ? { ...x, message, isEdited: true } : x))
            )
            socket.current.emit('edit-message', { ...activeId, userId: id, message, isEdited: true })
        } else {
            let sendMessage = {
                message,
                senderId: fromUserId,
                recieverId: id,
            }

            const sentMessage = await SendMessageRequest(sendMessage)

            sendMessage = { ...sentMessage, from: fromUserId, to: id }

            setMessages((prevMessages) => [...prevMessages, sendMessage])
            socket.current.emit('send-message', sendMessage)
        }

        reset({ message: '' })
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    const open = Boolean(anchorEl)

    return (
        <AppLayout appMenu={USER_APP_MENU}>
            <ValadationsMainWrap>
                <Container maxWidth={false} disableGutters>
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <ChatWrapper>
                                {messages.length > 0 ? (
                                    messages.map((msg, i) => (
                                        <React.Fragment key={i}>
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
                                                                <Button
                                                                    sx={{ color: 'blue.b700' }}
                                                                    onClick={deleteMessage(
                                                                        setMessages,
                                                                        msg._id,
                                                                        socket,
                                                                        id
                                                                    )}
                                                                >
                                                                    <DeleteIcon width={15} height={15} />{' '}
                                                                    <Typography variant="body2" ml={1}>
                                                                        Remove
                                                                    </Typography>
                                                                </Button>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Button
                                                                    sx={{ color: 'blue.b700' }}
                                                                    onClick={editMessage(msg, setValue, setActiveId)}
                                                                >
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
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <Typography variant="body1" align="center" my={2}>
                                        {"Let's start a conversation!"}
                                    </Typography>
                                )}
                            </ChatWrapper>
                            <FormProvider {...methods}>
                                <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit(sendMessage)}>
                                    <Grid container spacing={0}>
                                        <Grid item lg={11}>
                                            <TextFieldController name="message" placeholder="Send A Message..." />
                                        </Grid>
                                        <Grid item lg={1}>
                                            <Button type="submit">
                                                <SendIcon width={32} height={32} />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormProvider>
                        </Grid>
                        <Grid item lg={6}>
                            <ProfileDetails selectedId={id} setSelectedId={() => {}} showPermanent={true} />
                        </Grid>
                    </Grid>
                </Container>
            </ValadationsMainWrap>
        </AppLayout>
    )
}
