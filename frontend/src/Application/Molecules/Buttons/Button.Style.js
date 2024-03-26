import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const ButtonPrimaryStyled = styled(Button)(({ theme }) => ({
    borderRadius: 40,
    textTransform: 'none',
    fontSize: '20px',
    lineHeight: 'auto',
    color: theme.palette.blue.b700,
    borderColor: theme.palette.blue.b700,
    padding: theme.spacing(0.5, 5),
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
        backgroundColor: theme.palette.blue.b700,
        borderColor: theme.palette.blue.b700,
        color: theme.palette.white.main,
    },
}))

export const ButtonSecondaryStyled = styled(Button)(({ theme }) => ({
    borderRadius: 40,
    textTransform: 'none',
    fontSize: '20px',
    lineHeight: 'auto',
    color: theme.palette.blue.b700,
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0.5, 5),
    fontWeight: theme.typography.fontWeightRegular,
    boxShadow: theme.shadows[0],

    '&:hover': {
        backgroundColor: theme.palette.blue.b700,
        borderColor: theme.palette.blue.b700,
        color: theme.palette.white.main,
    },
}))
