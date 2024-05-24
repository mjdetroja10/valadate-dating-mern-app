import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const Img = styled('img')(({ theme }) => ({
    objectFit: 'cover',
    borderRadius: '12px',
    [theme.breakpoints.down('md')]: { width: '100px', height: '150px' },
    [theme.breakpoints.up('md')]: { width: '200px', height: '300px' },
}))

export const MainImgText = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    bottom: '15px',
    left: '6px',
    right: '0',
    margin: 'auto',
    color: theme.palette.primary.main,
    textAlign: 'left',
    fontWeight: 500,
    fontFamily: 'Josefin Sans',
}))
