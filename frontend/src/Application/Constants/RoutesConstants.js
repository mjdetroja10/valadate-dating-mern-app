export const HOME_URL = '/'

export const LOGIN_URL = '/login'

export const FORGOT_PASS_URL = '/forgot-password'

export const SIGNUP_URL = '/signup'

export const DISCOVER_URL = '/discover'

export const DASHBOARD_URL = '/dashboard'

export const VALADATIONS_URL = '/valadations'

export const DISCOVER_PROFILE_URL = DISCOVER_URL + '/profile-[name]'

export const COMMON_THREADS_URL = '/common-threads'

export const CONNECTIONS_URL = '/my-connections'

export const MY_PROFILE_URL = '/my-profile'

export const DATING_PREFERENCE_URL = '/dating-preference'

export const MY_ACCOUNT_URL = '/my-account'

export const WHY_VALADATE = '/why-valadate'
export const MISSION_URL = '/our-mission'
export const CONTACT_URL = '/contact-us'

export const UNPROTECTED_ROUTES = [LOGIN_URL, HOME_URL, SIGNUP_URL]

export const PROTECTED_ROUTES = [
    DISCOVER_URL,
    DASHBOARD_URL,
    COMMON_THREADS_URL,
    VALADATIONS_URL,
    MY_PROFILE_URL,
    DATING_PREFERENCE_URL,
    MY_ACCOUNT_URL,
]
