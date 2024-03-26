import Cookies from 'js-cookie'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import {
    COMMON_THREADS_URL,
    CONNECTIONS_URL,
    DISCOVER_URL,
    VALADATIONS_URL,
} from '@application/Constants/RoutesConstants'
import { CommonThreadsLinkIcon } from '@application/Molecules/icons/CommonThreadsLinkIcon'
import { DiscoverLinkIcon } from '@application/Molecules/icons/DiscoverLinkIcon'
import { MyConnectionsLinkIcon } from '@application/Molecules/icons/MyConnectionsLinkIcon'
import theme from '@application/Themes'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material'

import { Sidebar } from './Sidebar.style'

const beforeLoginList = ['Why Valadate?', 'Our Mission', 'Contact Us', 'Log In']

const afterLoginList = [
    {
        title: 'Discover',
        path: DISCOVER_URL,
        icon: <DiscoverLinkIcon width={20} height={20} />,
    },
    {
        title: 'Common Threads',
        path: COMMON_THREADS_URL,
        icon: <CommonThreadsLinkIcon width={24} height={24} />,
    },
    {
        title: 'My Connections',
        path: CONNECTIONS_URL,
        icon: <MyConnectionsLinkIcon width={34} height={20} />,
    },
    {
        title: 'Valadations',
        path: VALADATIONS_URL,
        icon: <MyConnectionsLinkIcon width={34} height={20} />,
    },
]

export const SidebarComponent = ({ sidebarShow, setSidebarShow }) => {
    const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

    const pathname = usePathname()

    const token = Cookies.get('token')

    useEffect(() => {
        if (token) setSidebarShow(true)
    }, [setSidebarShow, token])

    return (
        <Sidebar>
            {sidebarShow && !token && isMobileSize && (
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

            {sidebarShow && token && (
                <Drawer variant="permanent" anchor="left">
                    <List>
                        {afterLoginList.map((link, index) => (
                            // eslint-disable-next-line
                            <Link href={link.path} key={index}>
                                <ListItem className={pathname === link.path ? 'activeLink' : ''} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>{link?.icon}</ListItemIcon>
                                        {/* eslint-disable-next-line */}
                                        <ListItemText primary={link.title} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
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
