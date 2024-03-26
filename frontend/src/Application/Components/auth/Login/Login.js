'use client'

import Image from 'next/image'

import { APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import theme from '@application/Themes'
import { Container, Grid, Typography, useMediaQuery } from '@mui/material'
import LoginBanner from '@public/assets/images/Login_Hero_Image.jpg'

import { LoginFormWrapper, LoginImageWrapper, LoginPageMainWrap } from './Login.style'
import { LoginForm } from './LoginForm/LoginForm'

export const Login = () => {
    const appMenu = APP_MENU.slice(0, APP_MENU.length - 1)

    const isMobileSize = useMediaQuery(theme.breakpoints.down('lg'))

    return (
        <AppLayout appMenu={appMenu} hasMorePadding={true}>
            <LoginPageMainWrap>
                <Container maxWidth={false} disableGutters>
                    <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: { xs: 'center' } }}>
                        {!isMobileSize && (
                            <Grid item lg={6} sm={12}>
                                <LoginImageWrapper>
                                    <Image priority={true} src={LoginBanner} alt="" />
                                </LoginImageWrapper>
                            </Grid>
                        )}
                        <Grid item lg={6} sm={12}>
                            <LoginFormWrapper>
                                <Typography variant="h3">Welcome Back!</Typography>
                                <LoginForm />
                            </LoginFormWrapper>
                        </Grid>
                    </Grid>
                </Container>
            </LoginPageMainWrap>
        </AppLayout>
    )
}
