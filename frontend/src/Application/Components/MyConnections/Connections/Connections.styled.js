import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const MatchWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    margin: theme.spacing(1.25),
    '&::before': {
        content: '""',
        background:
            'linear-gradient(180deg, rgba(20, 92, 168, 0) 0%, rgba(20, 92, 168, 0.4) 26.43%, rgba(20, 92, 168, 0.8) 73%, #145ca8 100%)',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        width: '100%',
        height: '100px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomLeftRadius: '12px', // Corrected property name
        borderBottomRightRadius: '12px', // Corrected property name
    },
}))

export const NameText = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    bottom: '15px',
    left: '6px',
    right: '0',
    margin: 'auto',
    color: theme.palette.white.main,
    fontWeight: 600,
    textAlign: 'left',
}))

export const MatchImage = styled('img')(({ theme }) => ({
    width: 100,
    height: 150,
    borderRadius: '12px',
    objectFit: 'cover',
}))
