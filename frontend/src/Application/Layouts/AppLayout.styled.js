import styled from '@emotion/styled'

export const Wrapper = styled('div')(({ theme }) => ({
    marginTop: 100,

    '& .MuiAccordionSummary-content': {
        fontSize: '20px',
        alignItems: 'center',
        textTransform: 'capitalize',

        '& .MuiAvatar-root': {
            marginRight: '15px',
        },
    },

    '& .smallRoundImage': {
        marginRight: '15px',
    },

    '& .MuiTypography-body1': {
        fontSize: '20px',
    },

    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: 290,
    },
}))
