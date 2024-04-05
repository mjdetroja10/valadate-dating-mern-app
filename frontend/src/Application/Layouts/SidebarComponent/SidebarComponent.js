import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'

import theme from '@application/Themes'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material'

import { Sidebar } from './Sidebar.style'
import { APP_MENU_TYPES } from '@application/Constants/AppMenuConstant'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'

const beforeLoginList = ['Why Valadate?', 'Our Mission', 'Contact Us', 'Log In']

export const SidebarComponent = ({ sidebarData = [] }) => {
    const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

    const pathname = usePathname()

    return (
        <Sidebar>
            {isMobileSize && (
                <Drawer variant="permanent" anchor="left">
                    <List>
                        {beforeLoginList.map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}

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
        </Sidebar>
    )
}

SidebarComponent.propTypes = {
    sidebarShow: PropTypes.bool,
    setSidebarShow: PropTypes.func,
}
