import { fetchWrapper } from '@infrastructure/FetchWrapper/FetchWrapper'

const BASE_URL = process.env.NEXT_PUBLIC_APP_API

export class PublicConnector {
    static async configs() {
        return await fetchWrapper.get(`${BASE_URL}/configs`, {})
    }

    static async discoveryList(query) {
        return await fetchWrapper.get(`${BASE_URL}/auth/discover?page=${query?.page}&pageSize=${query?.pageSize}`, {})
    }

    static async dicoverSingleUser(id) {
        return await fetchWrapper.get(`${BASE_URL}/auth/discover/${id}`, {})
    }

    static async UpdateSingleUser(id, body) {
        return await fetchWrapper.formDataSubmit(`${BASE_URL}/auth/discover/${id}`, {
            body,
        })
    }
}
