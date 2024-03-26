import styled from '@emotion/styled'

export const Sidebar = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        '& .css-d7mua0-MuiDrawer-docked .MuiDrawer-paper': {
            top: '67px',
        },
        '& .MuiDrawer-docked': {
            width: '100%',
        },
        '& .MuiDrawer-docked .MuiDrawer-paper': {
            width: '100%',
        },
    },

    '& .activeLink': {
        '& .MuiButtonBase-root': {
            backgroundColor: '#E1EEFC',
            '& .MuiListItemText-primary': {
                fontWeight: 600,
            },
        },
    },
}))
