import { fetchWrapper } from '@infrastructure/FetchWrapper/FetchWrapper'

const BASE_URL = process.env.NEXT_PUBLIC_APP_API

export class MessageConnector {
    static async sendMessage(body) {
        return await fetchWrapper.post(`${BASE_URL}/auth/send-msg`, { body })
    }

    static async getMessages(id) {
        return await fetchWrapper.get(`${BASE_URL}/auth/get-msgs/${id}`, {})
    }

    static async deleteMessage(id) {
        return await fetchWrapper.deleteData(`${BASE_URL}/auth/delete-message/${id}`, {})
    }

    static async editMessage(body) {
        return await fetchWrapper.post(`${BASE_URL}/auth/edit-message`, { body })
    }
}
