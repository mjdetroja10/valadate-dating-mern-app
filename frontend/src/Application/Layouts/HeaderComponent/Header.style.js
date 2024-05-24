import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const NavbarLinkStyled = styled(Box)(({ theme }) => ({
    display: { xs: 'block' },
    width: '100%',
    color: theme.palette.black.main,
    '&:hover': {
        color: theme.palette.blue.b700,
    },
}))

export const HeaderMainWrap = styled('div')({
    '& .MuiLink-root': {
        width: 'auto',
    },
})

export const NavLinkWrapper = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },

    [theme.breakpoints.down('md')]: {
        // display: 'none',
    },
}))

export const MenuItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 2),
}))
