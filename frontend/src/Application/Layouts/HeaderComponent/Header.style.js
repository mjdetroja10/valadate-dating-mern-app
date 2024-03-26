import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const NavbarLinkStyled = styled(Box)(({ theme }) => ({
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
