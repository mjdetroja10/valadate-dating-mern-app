import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const tokenDecoded = () => {
    const token = Cookies.get('token')
    if (token) return jwtDecode(token)
    return {}
}
