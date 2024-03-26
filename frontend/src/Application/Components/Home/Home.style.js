import styled from '@emotion/styled'
import { Box } from '@mui/material'

const NetworkBackgroundImage = '/assets/images/Network_Background.png'

export const HomePageMainWrap = styled('div')({
    backgroundImage: `url(${NetworkBackgroundImage})`,
    backgroundSize: 'cover',
    paddingTop: '40px',
    paddingBottom: '40px',
    marginTop: '90px',
})

export const HomeTitle = styled('div')(({ theme }) => ({
    '& h4': {
        color: theme.palette.blue.b700,
        marginBottom: '25px',
    },
    '& .MuiStack-root': {
        width: '80%',
        margin: 'auto',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            width: '90%',
            margin: 'auto',
            flexDirection: 'column',
        },
    },
}))

export const QuoteWrapper = styled('div')(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
        width: '90%',
        margin: 'auto',
    },
}))

export const BoxStyled = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '100px',
    flexDirection: 'row',

    [theme.breakpoints.down('md')]: {
        marginBottom: '50px',
        flexDirection: 'column',
    },
    '& hr': {
        marginRight: '25px',
        marginLeft: '25px',
    },
    '& h5': {
        color: theme.palette.blue.b700,
        fontFamily: 'Josefin Sans',
        fontWeight: 500,
    },
    '& svg': {
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            marginBottom: '25px',
        },
    },
}))

export const MatchMakerLinks = styled(Box)(({ theme }) => ({
    backgroundColor: '#E1EEFC',
    padding: theme.spacing(2, 5),
    textAlign: 'center',
    textDecoration: 'none',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('md')]: {
        width: '100%',
    },

    '& p': {
        fontFamily: 'Josefin Sans',
        color: theme.palette.black.main,
        fontWeight: 500,
        marginTop: '12px',
    },
}))
