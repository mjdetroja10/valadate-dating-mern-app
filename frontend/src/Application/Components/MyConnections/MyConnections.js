'use client'
import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'

import React, { useState } from 'react'
import { MyFriends } from '../Valadations/MyFriends/MyFriends'

export const MyConnections = () => {
    const [activeTab, setActiveTab] = useState('Connections')
    const [newMatches, setNewMatches] = useState([])

    return (
        <AppLayout appMenu={USER_APP_MENU()} sidebarShow={true} hasLessSpace={true}>
            <Container maxWidth={false} disableGutters>
                <Stack direction="row" justifyContent="space-evenly">
                    {['Connections', 'Valadation'].map((item) => {
                        return (
                            <Box key={item}>
                                <ButtonPrimary
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0 !important',
                                        color: 'theme.primary.main',
                                        borderBottom: activeTab === item ? '1px solid' : 'none',
                                        padding: '0 !important',
                                        '&:hover': {
                                            backgroundColor: 'transparent !important',
                                            color: 'blue.b700 !important',
                                        },
                                    }}
                                    onClick={() => setActiveTab(item)}
                                >
                                    {item}
                                </ButtonPrimary>
                            </Box>
                        )
                    })}
                </Stack>

                {activeTab === 'Connections' ? (
                    <Grid container spacing={2} p={2}>
                        <Grid item lg={12} sx={{ mt: 4 }}>
                            <Typography variant="h5" color="blue.b700" fontWeight={500}>
                                New Matches
                            </Typography>

                            {newMatches.length > 0 && (
                                <Stack direction="row">
                                    {newMatches
                                        .slice(-3)
                                        .reverse()
                                        .map((match) => {
                                            return (
                                                <Box
                                                    key={match._id}
                                                    m={1.25}
                                                    sx={{ position: 'relative' }}
                                                    className="connection-wrapper"
                                                >
                                                    <img
                                                        src={match?.frd?.images[0]?.src}
                                                        style={{
                                                            width: 100,
                                                            height: 150,
                                                            borderRadius: '12px',
                                                            objectFit: 'cover',
                                                        }}
                                                        alt=""
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: '15px',
                                                            left: '6px',
                                                            right: '0',
                                                            margin: 'auto',
                                                            color: '#fff',
                                                        }}
                                                        align="left"
                                                        fontWeight={600}
                                                    >
                                                        {match?.frd?.firstName}
                                                    </Typography>
                                                </Box>
                                            )
                                        })}
                                </Stack>
                            )}
                        </Grid>
                        <MyFriends title="Connections" setNewMatches={setNewMatches} />
                    </Grid>
                ) : activeTab === 'Valadation' ? (
                    'Valadation'
                ) : (
                    ''
                )}
            </Container>
        </AppLayout>
    )
}
