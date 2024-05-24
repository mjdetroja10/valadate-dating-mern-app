'use client'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { Box, Container, Stack } from '@mui/material'

import React, { useMemo, useState } from 'react'
import { Connections } from './Connections/Connections'
import { StyledButton } from './MyConnections.styled'
import { Valadation } from './Valadation/Valadation'

const CONNECTION_TAB = {
    CONNECTION: 'CONNECTION',
    VALADATION: 'VALADATION',
}

const tabData = [
    {
        title: 'Connections',
        key: CONNECTION_TAB.CONNECTION,
    },
    {
        title: 'Valadation',
        key: CONNECTION_TAB.VALADATION,
    },
]

export const MyConnections = () => {
    const [activeTab, setActiveTab] = useState(CONNECTION_TAB.CONNECTION)

    const activeComponent = useMemo(() => {
        switch (activeTab) {
            case CONNECTION_TAB.CONNECTION:
                return <Connections />

            case CONNECTION_TAB.VALADATION:
                return <Valadation />

            default:
                return ''
        }
    }, [activeTab])

    return (
        <AppLayout appMenu={USER_APP_MENU()} sidebarShow={true} hasLessSpace={true}>
            <Container maxWidth={false} disableGutters sx={{ padding: 2.5 }}>
                <Stack direction="row" justifyContent="space-evenly">
                    {tabData.map((item) => {
                        return (
                            <Box key={item.key}>
                                <StyledButton
                                    variant="standard"
                                    // sx={{
                                    //     borderBottom: activeTab === item.key ? '1px solid' : 'none',
                                    // }}
                                    className={activeTab === item.key ? 'active-tab' : ''}
                                    onClick={() => setActiveTab(item.key)}
                                >
                                    {item.title}
                                </StyledButton>
                            </Box>
                        )
                    })}
                </Stack>

                {activeComponent}
            </Container>
        </AppLayout>
    )
}
