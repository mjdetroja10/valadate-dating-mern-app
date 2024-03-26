import theme from '@application/Themes'
import styled from '@emotion/styled'

export const ValadationsMainWrap = styled('div')({
    marginLeft: 290,
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
})

export const ChatWrapper = styled('div')(({ theme }) => ({
    border: '1px solid #B5D4F6',
    borderRadius: 12,
    padding: theme.spacing(1, 2.5),
    height: 'calc(80vh - 80px)',
    overflowY: 'scroll',
}))

export const LeftSideMessage = styled('div')({
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 4,
    padding: '12px 20px',
    width: 'fit-content',
    marginBottom: '20px',
})

export const RightSideMessage = styled('div')({
    backgroundColor: '#E1EEFC',
    borderRadius: 4,
    padding: '12px 20px',
    width: 'fit-content',
    marginLeft: 'auto',
    marginBottom: '20px',
})
