'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import * as yup from 'yup'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { AppLayout } from '@application/Layouts/AppLayout'
import { SendIcon } from '@application/Molecules/icons/SendIcon'
import { tokenDecoded } from '@application/Utils/TokenDecodeUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Grid, Typography } from '@mui/material'

import { ChatWrapper, LeftSideMessage, RightSideMessage, ValadationsMainWrap } from '../Valadations.style'
import { GetMessagesRequest } from '@store/Requests/GetMessagesRequest'
import { SendMessageRequest } from '@store/Requests/SendMessageRequest'
import { ProfileDetails } from '@application/Components/Discover/ProfileDetails/ProfileDetails'
import { useFetch } from '@application/Hooks/useFetch'

const sendMsgValidator = yup.object().shape({
    message: yup.string().required(),
})

const getMessages = (sendMessage) => (data) => {
    sendMessage(data)
}

export const Chat = () => {
    const [messages, setMessages] = useState([])
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

    const { handleSubmit, reset } = methods

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
                console.log(data, 'aaaaaaaaaaaaaaaaa')
                setMessages((prevMessages) => [...prevMessages, data])
            })
        }
    }, [socket])

    const sendMessage = async ({ message }) => {
        if (!message || message.trim() === '') return null

        let sendMessage = {
            message,
            senderId: fromUserId,
            recieverId: id,
        }

        await SendMessageRequest(sendMessage)
        sendMessage = { ...sendMessage, from: fromUserId, to: id }

        setMessages((prevMessages) => [...prevMessages, sendMessage])
        socket.current.emit('send-message', sendMessage)
        reset({ message: '' })
    }

    useEffect(() => {
        fetchRequest()
    }, [])

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
                                                <RightSideMessage>
                                                    <Typography variant="body1">{msg.message}</Typography>
                                                </RightSideMessage>
                                            ) : (
                                                <LeftSideMessage>
                                                    <Typography variant="body1">{msg.message}</Typography>
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
