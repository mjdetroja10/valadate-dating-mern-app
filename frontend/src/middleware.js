import { NextResponse } from 'next/server'

import { DISCOVER_URL, LOGIN_URL, PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@application/Constants/RoutesConstants'
import { jwtDecrypt } from '@application/Utils/TokenDecodeUtility'
import { cookies } from 'next/headers'

const isTokenExpired = (expiredTime) => {
    if (!expiredTime) return true

    return new Date(expiredTime * 1000) - new Date() < 0 ? true : false
}

const isAuthenticated = () => {
    let token = cookies().get('token')?.value
    let user = token ? jwtDecrypt(token) : null

    return Boolean(user && !isTokenExpired(user?.exp))
}

export function middleware(request) {
    const { pathname, origin } = request.nextUrl

    if (isAuthenticated() && UNPROTECTED_ROUTES.includes(pathname)) {
        return NextResponse.redirect(`${origin}${DISCOVER_URL}`)
    }

    let modifiedPathname = '/' + pathname.split('/')[1] || '/'

    if (!isAuthenticated() && PROTECTED_ROUTES.includes(modifiedPathname)) {
        return NextResponse.redirect(`${origin}${LOGIN_URL}`)
    }
}
