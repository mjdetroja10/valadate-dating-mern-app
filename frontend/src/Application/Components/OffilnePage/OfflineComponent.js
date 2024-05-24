'use client'

import { AppLayout } from '@application/Layouts/AppLayout'
import React from 'react'
import { HomePageMainWrap } from '../Home/Home.style'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'

const style = {
    position: 'relative',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: ' 4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)',
    borderRadius: 2,
    p: 4,
}

export const OfflineComponent = () => {
    const rootRef = React.useRef(null)

    return (
        <AppLayout appMenu={[]} hasMorePadding={true}>
            <HomePageMainWrap>
                <Box
                    sx={{
                        height: 300,
                        flexGrow: 1,
                        minWidth: 300,
                        transform: 'translateZ(0)',
                        // The position fixed scoping doesn't work in IE11.
                        // Disable this demo to preserve the others.
                        '@media all and (-ms-high-contrast: none)': {
                            display: 'none',
                        },
                    }}
                    ref={rootRef}
                >
                    <Modal
                        disablePortal
                        disableEnforceFocus
                        disableAutoFocus
                        open
                        aria-labelledby="server-modal-title"
                        aria-describedby="server-modal-description"
                        sx={{
                            display: 'flex',
                            p: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        container={() => rootRef.current}
                    >
                        <Box sx={style}>
                            <Typography id="server-modal-title" variant="h6" component="h2">
                                Something went Wrong
                            </Typography>
                            <Typography id="server-modal-description" sx={{ pt: 2 }}>
                                Cannot connect to server. Please make sure you are connected to the Internet and try
                                again
                            </Typography>
                        </Box>
                    </Modal>
                </Box>
            </HomePageMainWrap>
        </AppLayout>
    )
}
