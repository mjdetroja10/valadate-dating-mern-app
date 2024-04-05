'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import * as yup from 'yup'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { userDetails } from '@application/Utils/TokenDecodeUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Grid } from '@mui/material'

import { GetMessagesRequest } from '@store/Requests/GetMessagesRequest'
import { SendMessageRequest } from '@store/Requests/SendMessageRequest'
import { ProfileDetails } from '@application/Components/Discover/ProfileDetails/ProfileDetails'
import { useFetch } from '@application/Hooks/useFetch'
import { DeleteMessageRequest } from '@store/Requests/DeleteMessageRequest'
import { EditMessageRequest } from '@store/Requests/EditMessageRequest'
import { MessagePreview } from './MessagePreview/MessagePreview'
import { SendMessage } from './SendMessage/SendMessage'
import { useSelector } from 'react-redux'

const sendMsgValidator = yup.object().shape({
    message: yup.string().required(),
})

const getMessages = (sendMessage) => (data) => {
    sendMessage(data)
}

const deleteMessage = (setMessages, socket, userId) => (msgId) => async () => {
    setMessages((prev) => prev.filter((x) => x._id !== msgId))

    const data = await DeleteMessageRequest(msgId)

    socket.current.emit('delete-msg', { userId, msgId: msgId })
}

const editMessage = (setValue, setEditMessageId) => (msg) => async () => {
    setValue('message', msg.message)
    setEditMessageId(msg)
}

const sendMessage =
    (editMessageId, setEditMessageId, setMessages, socket, reset, fromUserId, id) =>
    async ({ message }) => {
        if (!message || message.trim() === '') return null

        if (editMessageId) {
            const edit = await EditMessageRequest({ id: editMessageId._id, message })

            if (!edit?.data) return null

            setMessages((prevMessages) =>
                prevMessages.map((x) => (x._id === editMessageId._id ? { ...x, message, isEdited: true } : x))
            )
            socket.current.emit('edit-message', { ...editMessageId, userId: id, message, isEdited: true })
            setEditMessageId('')
        } else {
            let sendMessage = {
                message,
                senderId: fromUserId,
                recieverId: id,
            }

            const sentMessage = await SendMessageRequest(sendMessage)

            setMessages((prevMessages) => [...prevMessages, sentMessage])
            socket.current.emit('send-message', sentMessage)
        }

        reset({ message: '' })
    }

export const Chat = () => {
    const { id } = useParams()
    const [messages, setMessages] = useState([])
    const [editMessageId, setEditMessageId] = useState('')
    const socket = useRef()
    const fromUserId = userDetails()?.id

    const { fetchRequest: getUserMessages } = useFetch({
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

    useEffect(() => {
        getUserMessages()
    }, [])

    return (
        <AppLayout appMenu={USER_APP_MENU()} sidebarShow={true} hasLessSpace={true}>
            <Container maxWidth={false} disableGutters>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <MessagePreview
                            messages={messages}
                            handleDeleteMessage={deleteMessage(setMessages, socket, id)}
                            handleEditMessage={editMessage(setValue, setEditMessageId)}
                            fromUserId={fromUserId}
                        />

                        <SendMessage
                            methods={methods}
                            handleSendMessage={handleSubmit(
                                sendMessage(editMessageId, setEditMessageId, setMessages, socket, reset, fromUserId, id)
                            )}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <ProfileDetails selectedId={id} setSelectedId={() => {}} showPermanent={true} />
                    </Grid>
                </Grid>
            </Container>
        </AppLayout>
    )
}
