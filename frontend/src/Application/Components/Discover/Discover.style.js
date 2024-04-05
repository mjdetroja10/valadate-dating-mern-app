import styled from '@emotion/styled'
import { Box } from '@mui/system'

export const DiscoverMainWrap = styled('div')({
    marginLeft: 290,
    marginTop: 90,
})

export const UserCard = styled('div')({
    height: 400,
    position: 'relative',

    '& h5': {
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        left: 0,
        right: 0,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        visibility: 'hidden',
        textDecoration: 'underline',
    },

    '& img': {
        height: '100%',
        borderRadius: '12px',
        zIndex: 0,
        objectFit: 'cover',
        width: '100%',
        objectPosition: 'top',
    },

    '&::before': {
        content: '""',
        backgroundColor: '#0C0E10',
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        zIndex: 1,
        transition: 'all 0.5s',
        cursor: 'pointer',
    },

    '&:hover': {
        '&::before': {
            opacity: 0.6,
        },

        '& h5': {
            visibility: 'visible',
        },
    },
})

export const UserCardText = styled('div')({
    background:
        'linear-gradient(180deg, rgba(20, 92, 168, 0) 0%, rgba(20, 92, 168, 0.4) 26.43%, rgba(20, 92, 168, 0.8) 73%, #145CA8 100%)',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    padding: '0px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& .MuiTypography-body1': {
        fontWeight: 600,
        color: '#FFFFFF',
        marginBottom: 12,

        '& span': {
            fontWeight: 400,
        },
    },

    '& .MuiTypography-body2': {
        fontWeight: 600,
        marginBottom: 8,
        fontFamily: 'Josefin Sans',
        textShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    },

    '& .MuiCircularProgress-root': {
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
})

export const YellowBackgroundWrapper = styled('div')({
    backgroundColor: '#F9DB6D',
    borderRadius: '12px',
    padding: '20px 40px',
})

export const ProfileDetailsWrapper = styled(Box)({
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#FBFDFF',
    borderRadius: '12px',
    padding: 20,
    height: 'calc(100vh - 70px)',
    overflow: 'auto',
    position: 'fixed',

    '&::-webkit-scrollbar': {
        width: '3px',
    },

    '&::-webkit-scrollbar-track': {
        background: '#ffffff',
    },

    '&::-webkit-scrollbar-thumb': {
        background: '#145CA8',
    },

    '& img': {
        border: '1px solid #E7E7E7',
        borderRadius: '12px',
        height: '400px',
        objectFit: 'cover',
        width: '100%',
        objectPosition: 'top',
    },

    '& .actionBtn': {
        border: 'none',
        cursor: 'pointer',
        background: 'none',
        '& img': {
            width: 'auto',
            height: 'auto',
            border: 'none',
        },
    },

    '& .smallerImage': {
        height: '190px',
        objectFit: 'cover',
    },
})

export const ProfileTextWrapper = styled('div')({
    border: '1px solid #F9DB6D',
    borderRadius: '12px',
    padding: 20,

    '& h4': {
        color: '#145CA8',
        fontWeight: 600,

        '& span': {
            fontWeight: 400,
            marginLeft: '12px',
        },
    },
})

export const ProfileActionWrapper = styled('div')({
    boxShadow: '0px -1px 4px rgba(12, 14, 16, 0.15)',
    backgroundColor: '#FBFDFF',
    padding: '20px',
    marginTop: 30,

    '& img': {
        height: 'auto',
        border: 'none',
        borderRadius: 0,
        objectFit: 'initial',
    },

    '& .MuiBox-root': {
        textAlign: 'center',
    },
})

export const StyledBox = styled(Box)(() => ({
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))
