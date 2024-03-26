import styled from '@emotion/styled'

const NetworkBackgroundImage = '/assets/images/Network_Background.png'

export const LoginPageMainWrap = styled('div')(({ theme }) => ({
    height: '100vh',
    backgroundImage: `url(${NetworkBackgroundImage})`,
    backgroundSize: 'cover',

    [theme.breakpoints.down('sm')]: {
        marginTop: '127px',
    },
}))

export const LoginImageWrapper = styled('div')({
    height: '100vh',
    '& img': {
        height: '100%',
        width: '100%',
    },
})

export const LoginFormWrapper = styled('div')(({ theme }) => ({
    maxWidth: '70%',
    margin: 'auto',

    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    },

    '& h3': {
        textAlign: 'center',
        color: theme.palette.blue.b700,
        marginBottom: '60px',
    },

    '& .MuiFormControlLabel-label': {
        fontFamily: 'Josefin Sans',
        fontSize: '20px',
    },

    '& .MuiTypography-body2': {
        marginBottom: '20px',
        marginTop: '5px',
        fontWeight: 600,
        textTransform: 'capitalize',
    },

    '& .MuiAlert-message': {
        fontWeight: 600,
    },
}))
