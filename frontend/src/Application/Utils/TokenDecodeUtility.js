import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const userDetails = () => {
    const token = Cookies.get('token')
    if (token) return jwtDecode(token)
    return null
}

export const jwtDecrypt = (token) => {
    if (token) return jwtDecode(token)
    return null
}
