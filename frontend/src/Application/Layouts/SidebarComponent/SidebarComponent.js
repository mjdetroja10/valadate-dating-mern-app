import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'

import theme from '@application/Themes'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material'

import { Sidebar } from './Sidebar.style'
import { APP_MENU_TYPES } from '@application/Constants/AppMenuConstant'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'

export const SidebarComponent = ({ sidebarData = [], toggleSidebar, setToggleSidebar }) => {
    const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

    const open = Boolean(toggleSidebar)
    const id = open ? 'simple-popover' : undefined

    const pathname = usePathname()

    console.log(toggleSidebar, 'toggleSidebar')

    return (
        <Sidebar>
            {(!isMobileSize || (isMobileSize && toggleSidebar)) && (
                <Drawer variant="permanent" anchor="left">
                    <List sx={{ height: '100%' }}>
                        {sidebarData.map((link, index) => {
                            return (
                                <Box className={link?.className || ''} key={index}>
                                    {link.group.map((groupLink) =>
                                        groupLink.type === APP_MENU_TYPES.LINK ? (
                                            // eslint-disable-next-line
                                            <Link href={groupLink.path} key={groupLink.title}>
                                                <ListItem
                                                    className={
                                                        pathname === groupLink.path ||
                                                        '/' + pathname.split('/')[1] === groupLink.path
                                                            ? 'activeLink'
                                                            : ''
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton>
                                                        <ListItemIcon>{groupLink?.icon}</ListItemIcon>
                                                        {/* eslint-disable-next-line */}
                                                        <ListItemText primary={groupLink.title} />
                                                    </ListItemButton>
                                                </ListItem>
                                            </Link>
                                        ) : groupLink.type === APP_MENU_TYPES.BUTTON ? (
                                            <ButtonPrimary
                                                type="button"
                                                variant="standard"
                                                sx={{
                                                    borderRadius: '0 !important',
                                                    width: '100%',
                                                    color: '#0C0E10 !important',
                                                    fontWeight: '500 !important',
                                                }}
                                                onClick={groupLink?.action || (() => {})}
                                                key={groupLink.title}
                                            >
                                                {groupLink.title}
                                            </ButtonPrimary>
                                        ) : (
                                            ''
                                        )
                                    )}
                                </Box>
                            )
                        })}
                    </List>
                </Drawer>
            )}
        </Sidebar>
    )
}

SidebarComponent.propTypes = {
    sidebarShow: PropTypes.bool,
    setSidebarShow: PropTypes.func,
}
