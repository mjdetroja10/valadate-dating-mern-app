import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
    fontFamily: 'Josefin Sans',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '16px',
    textAlign: 'center',
    color: theme.palette.blue.b700,
    position: 'relative',
    padding: 0,
    textTransform: 'capitalize',

    '&.active-tab': {
        '&::before': {
            content: '""',
            width: '100%',
            height: '1px',
            position: 'absolute',
            left: 0,
            bottom: 0,
            backgroundColor: theme.palette.blue.b700,
        },
    },
}))
