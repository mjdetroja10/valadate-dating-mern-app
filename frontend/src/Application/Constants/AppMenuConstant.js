import { CONTACT_URL, DISCOVER_URL, LOGIN_URL, MISSION_URL, MY_PROFILE_URL, WHY_VALADATE } from './RoutesConstants'
// import { store } from '@store/Store'
import { Notification } from '@application/Layouts/HeaderComponent/Notifcation/Notification'
import { HomeIcon } from '@application/Molecules/icons/HomeIcom'
import { store } from '@store/Store'

export const APP_MENU_TYPES = {
    BUTTON: 'BUTTON',
    LINK: 'LINK',
    SUBMITBTN: 'SUBMIT',
    ICON: 'ICON',
    COMPONENT: 'COMPONENT',
    PICTURE: 'PICTURE_BTN',
    ICON_BTN: 'ICON_BTN',
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

const getUserProfile = () => {
    let user = store.getState()?.userDetails?.user

    if (!user && !user?.images && user?.images.length === 0) return null
    return user?.images[0]?.src
}

export const USER_APP_MENU = (hasProfileMenu = false) => {
    const profilePic = getUserProfile()
    let adddedItem = hasProfileMenu
        ? {
              title: 'Home',
              path: DISCOVER_URL,
              permission: [],
              type: APP_MENU_TYPES.ICON_BTN,
              content: <HomeIcon height={38} width={38} />,
          }
        : {
              title: 'User',
              path: MY_PROFILE_URL,
              permission: [],
              type: APP_MENU_TYPES.ICON_BTN,
              content: profilePic ? (
                  <img
                      src={getUserProfile()}
                      style={{ height: 38, width: 38, borderRadius: '50%', objectFit: 'cover' }}
                      alt="User Image"
                  />
              ) : (
                  ''
              ),
          }

    return [
        {
            group: [
                {
                    title: 'Notification',
                    path: '',
                    permission: [],
                    type: APP_MENU_TYPES.COMPONENT,
                    component: <Notification />,
                },
            ].concat([adddedItem]),
        },
    ]
}
