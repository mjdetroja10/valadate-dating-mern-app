'use client'
import Image from 'next/image'
import Link from 'next/link'

import { APP_MENU } from '@application/Constants/AppMenuConstant'
import { SIGNUP_URL } from '@application/Constants/RoutesConstants'
import { AppLayout } from '@application/Layouts/AppLayout'
import { HeartMagnifier } from '@application/Molecules/icons/HeartMagnifier'
import { QuoteIcon } from '@application/Molecules/icons/QuoteIcon'
import { TwoHeartsIcon } from '@application/Molecules/icons/TwoHeartsIcon'
import { Container, Divider, Grid, Stack, Typography } from '@mui/material'
import HeroImage from '@public/assets/images/Hero_Image.png'

import { BoxStyled, HomePageMainWrap, HomeTitle, MatchMakerLinks, QuoteWrapper } from './Home.style'

const MatchMakerDetails = [
    {
        title: 'Find A Match',
        width: 70,
        height: 48,
        icon: TwoHeartsIcon,
        variant: 'body1',
    },
    {
        title: 'Be A Matchmaker',
        width: 48,
        height: 48,
        icon: HeartMagnifier,
        variant: 'body1',
    },
]

export const Home = () => {
    return (
        <AppLayout appMenu={APP_MENU} hasMorePadding={true}>
            <HomePageMainWrap>
                <Container maxWidth="xl">
                    <Grid container alignItems="center" spacing={7}>
                        <Grid item lg={6} sm={12}>
                            <Image priority={true} style={{ width: '100%', height: 'auto' }} src={HeroImage} alt="" />
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <QuoteWrapper>
                                <HomeTitle>
                                    <Typography variant="h4" sx={{ color: 'blue.b700', marginBottom: 4 }}>
                                        Common Threads Leading To Uncommon Connections
                                    </Typography>
                                </HomeTitle>
                                <BoxStyled>
                                    <QuoteIcon width={60} height={75} />
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="h5">
                                        Dating never felt this comfortable, I love it, my friends are excited to have
                                        helped me, and I found someone I really connect with.
                                    </Typography>
                                </BoxStyled>
                            </QuoteWrapper>
                            <HomeTitle>
                                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                                    Get Started!
                                </Typography>
                                <Stack spacing={0} component={Link} href={SIGNUP_URL}>
                                    {MatchMakerDetails.map((element) => {
                                        const Icon = element.icon
                                        return (
                                            <MatchMakerLinks key={element.title}>
                                                <Icon width={element.width} height={element.height} />
                                                <Typography variant={element.variant}>{element.title}</Typography>
                                            </MatchMakerLinks>
                                        )
                                    })}
                                </Stack>
                            </HomeTitle>
                        </Grid>
                    </Grid>
                </Container>
            </HomePageMainWrap>
        </AppLayout>
    )
}
