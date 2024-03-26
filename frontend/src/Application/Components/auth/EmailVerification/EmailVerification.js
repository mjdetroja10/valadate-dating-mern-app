'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AppLayout } from '@application/Layouts/AppLayout'
import { Alert, AlertTitle, Container, Grid } from '@mui/material'
import { EmailVerifyRequest } from '@store/Requests/EmailVerifyRequest'

import { SignUpWrapper as Wrapper } from '../SignUp/SignUp.style'

export const EmailVerification = () => {
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

    const { code } = useParams()

    useEffect(() => {
        EmailVerifyRequest({ code }, setAlert)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AppLayout>
            <Wrapper>
                <Container>
                    <Grid container justifyContent="center" spacing={0}>
                        <Grid item lg={8}>
                            {alert?.message && (
                                <Alert severity={alert.type}>
                                    <AlertTitle>{alert.type}</AlertTitle>
                                    {alert?.message}
                                </Alert>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Wrapper>
        </AppLayout>
    )
}
