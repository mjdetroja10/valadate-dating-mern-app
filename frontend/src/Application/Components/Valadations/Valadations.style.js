import theme from '@application/Themes'
import styled from '@emotion/styled'
import { List } from '@mui/material'

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
    position: 'relative',
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
    position: 'relative',
})

export const StyledList = styled(List)(({ theme }) => ({
    marginLeft: 'auto',
    float: 'right',
    position: 'absolute',
    left: 0,
    top: '41px',
    // background: theme.palette.primary.main,
    boxShadow: theme.shadows[0],
    color: 'white',
}))
