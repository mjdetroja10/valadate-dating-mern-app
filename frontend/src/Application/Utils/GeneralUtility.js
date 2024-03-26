import Cookies from 'js-cookie'

import { LOGIN_URL } from '@application/Constants/RoutesConstants'

export const unAuthorized = (errors) => {
    if (errors?.forceLogout) {
        Cookies.remove('token', { path: '' })
        window.location.href = `http://localhost:8801${LOGIN_URL}`
        return
    }
}

export const validationErrors = (errors = [], setError) => {
    if (errors.length > 0)
        errors.forEach(({ fieldname, message }) => {
            setError(fieldname, { message: message })
        })
}
