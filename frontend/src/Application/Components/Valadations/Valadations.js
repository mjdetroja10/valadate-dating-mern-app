'use client'

import { useEffect, useState } from 'react'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { Container, Grid } from '@mui/material'
import { PendingRequest } from '@store/Requests/PendingRequest'

import { MyFriends } from './MyFriends/MyFriends'
import { ValadationsMainWrap as Wrapper } from './Valadations.style'
import { ValadationsRequests } from './ValadationsRequests/ValadationsRequests'

export const Valadations = () => {
    const [pendingRequestList, setPendingRequestList] = useState(null)
    const [reloadMyFrds, setReloadMyFrds] = useState(false)

    useEffect(() => {
        PendingRequest(setPendingRequestList)
    }, [])

    return (
        <AppLayout appMenu={USER_APP_MENU}>
            <Wrapper>
                <Container maxWidth={false} disableGutters>
                    <Grid container spacing={2}>
                        <ValadationsRequests
                            pendingRequestList={pendingRequestList}
                            setPendingRequestList={setPendingRequestList}
                            setReloadMyFrds={setReloadMyFrds}
                        />
                        <MyFriends reloadMyFrds={reloadMyFrds} setReloadMyFrds={setReloadMyFrds} />
                    </Grid>
                </Container>
            </Wrapper>
        </AppLayout>
    )
}
