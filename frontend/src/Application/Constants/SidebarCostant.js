import {
    COMMON_THREADS_URL,
    CONNECTIONS_URL,
    DISCOVER_URL,
    LOGIN_URL,
    MY_PROFILE_URL,
    VALADATIONS_URL,
} from '@application/Constants/RoutesConstants'
import { DiscoverLinkIcon } from '@application/Molecules/icons/DiscoverLinkIcon'
import { CommonThreadsLinkIcon } from '@application/Molecules/icons/CommonThreadsLinkIcon'
import { MyConnectionsLinkIcon } from '@application/Molecules/icons/MyConnectionsLinkIcon'
import { APP_MENU_TYPES } from './AppMenuConstant'
import Cookies from 'js-cookie'

export const generalSidebarList = [
    {
        group: [
            {
                title: 'Discover',
                path: DISCOVER_URL,
                type: APP_MENU_TYPES.LINK,
                icon: <DiscoverLinkIcon width={20} height={20} />,
            },
            {
                title: 'Common Threads',
                path: COMMON_THREADS_URL,
                type: APP_MENU_TYPES.LINK,
                icon: <CommonThreadsLinkIcon width={24} height={24} />,
            },
            {
                title: 'My Connections',
                type: APP_MENU_TYPES.LINK,
                path: CONNECTIONS_URL,
                icon: <MyConnectionsLinkIcon width={34} height={20} />,
            },
            {
                title: 'Valadations',
                type: APP_MENU_TYPES.LINK,
                path: VALADATIONS_URL,
                icon: <MyConnectionsLinkIcon width={34} height={20} />,
            },
        ],
    },
]

export const profileSidebarList = [
    {
        group: [
            {
                title: 'My Profile',
                type: APP_MENU_TYPES.LINK,
                path: MY_PROFILE_URL,
                icon: <DiscoverLinkIcon width={20} height={20} />,
            },
            {
                title: 'Dating Preference',
                type: APP_MENU_TYPES.LINK,
                path: '',
                icon: <CommonThreadsLinkIcon width={24} height={24} />,
            },
            {
                title: 'My Account',
                type: APP_MENU_TYPES.LINK,
                path: '',
                icon: <MyConnectionsLinkIcon width={34} height={20} />,
            },
        ],
    },
    {
        group: [
            {
                title: 'Log Out',
                type: APP_MENU_TYPES.BUTTON,
                action: () => {
                    Cookies.remove('token')
                    window.location.href = `http://localhost:8801${LOGIN_URL}`
                },
            },
        ],
        className: 'align-bottom',
    },
]
