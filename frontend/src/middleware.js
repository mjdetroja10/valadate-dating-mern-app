import { NextResponse } from 'next/server'

import { DISCOVER_URL, LOGIN_URL, PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@application/Constants/RoutesConstants'

export function middleware(request) {
    let cookie = request.cookies.get('token')

    const { pathname, origin } = request.nextUrl

    if (cookie && UNPROTECTED_ROUTES.includes(pathname)) return NextResponse.redirect(`${origin}${DISCOVER_URL}`)

    if (!cookie && PROTECTED_ROUTES.includes(pathname)) {
        return NextResponse.redirect(`${origin}${LOGIN_URL}`)
    }
}
