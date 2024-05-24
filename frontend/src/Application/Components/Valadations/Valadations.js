'use client'

import { useEffect, useState } from 'react'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { Box, Container, Grid } from '@mui/material'
import { PendingRequest } from '@store/Requests/PendingRequest'

import { MyFriends } from './MyFriends/MyFriends'
import { ValadationsRequests } from './ValadationsRequests/ValadationsRequests'

export const Valadations = () => {
    const [pendingRequestList, setPendingRequestList] = useState(null)
    const [reloadMyFrds, setReloadMyFrds] = useState(false)

    useEffect(() => {
        PendingRequest(setPendingRequestList)
    }, [])

    return (
        <AppLayout appMenu={USER_APP_MENU()} sidebarShow={true} hasLessSpace={true}>
            <Container maxWidth={false} disableGutters sx={{ p: 2.5 }}>
                <ValadationsRequests
                    pendingRequestList={pendingRequestList}
                    setPendingRequestList={setPendingRequestList}
                    setReloadMyFrds={setReloadMyFrds}
                />
                <MyFriends title="My Friends" reloadMyFrds={reloadMyFrds} setReloadMyFrds={setReloadMyFrds} />
            </Container>
        </AppLayout>
    )
}
