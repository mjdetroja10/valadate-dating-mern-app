const { fetchWrapper } = require('@infrastructure/FetchWrapper/FetchWrapper')

const BASE_URL = process.env.NEXT_PUBLIC_APP_API

export class AuthConnector {
    static async login(body) {
        return await fetchWrapper.post(`${BASE_URL}/login`, { body })
    }

    static async signup(body) {
        return await fetchWrapper.formDataSubmit(`${BASE_URL}/sign-up`, { body })
    }

    static async forgotPassword(body) {
        return await fetchWrapper.post(`${BASE_URL}/forgot-password`, { body })
    }

    static async ResetPassWord(body) {
        return await fetchWrapper.post(`${BASE_URL}/reset-password`, { body })
    }

    static async EmailVerify(body) {
        return await fetchWrapper.post(`${BASE_URL}/email-verification`, { body })
    }
}
