import Cookies from 'js-cookie'

import { NotificationIcon } from '@application/Molecules/icons/NotificationIcon'
import { tokenDecoded } from '@application/Utils/TokenDecodeUtility'

import { CONTACT_URL, LOGIN_URL, MISSION_URL, WHY_VALADATE } from './RoutesConstants'

export const APP_MENU_TYPES = {
    BUTTON: 'BUTTON',
    LINK: 'LINK',
    SUBMITBTN: 'SUBMIT',
    ICON: 'ICON',
    PICTURE: 'PICTURE',
}

const removeCookies = () => {
    Cookies.remove('token', { path: '' })
}

export const APP_MENU = [
    {
        group: [
            {
                title: 'Why Valadate?',
                path: WHY_VALADATE,
                permission: [],
                type: APP_MENU_TYPES.LINK,
            },
            {
                title: 'Our Mission',
                path: MISSION_URL,
                permission: [],
                type: APP_MENU_TYPES.LINK,
            },
            {
                title: 'Contact Us',
                path: CONTACT_URL,
                permission: [],
                type: APP_MENU_TYPES.LINK,
            },
        ],
    },
    {
        group: [
            {
                title: 'Log In',
                path: LOGIN_URL,
                permission: [],
                type: APP_MENU_TYPES.BUTTON,
                isLoading: false,
            },
        ],
    },
]

const userDetails = tokenDecoded()

export const USER_APP_MENU = [
    {
        group: [
            {
                title: 'Notification',
                path: '',
                permission: [],
                type: APP_MENU_TYPES.ICON,
                icon: <NotificationIcon height={34} width={34} />,
            },
            {
                title: 'User',
                path: '',
                permission: [],
                type: APP_MENU_TYPES.PICTURE,
                src: userDetails?.images && userDetails?.images.length > 0 && userDetails?.images[0]?.src,
            },

            {
                title: 'Logout',
                path: '',
                permission: [],
                type: APP_MENU_TYPES.BUTTON,
                action: removeCookies,
            },
        ],
    },
]
