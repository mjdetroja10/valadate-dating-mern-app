import { fetchWrapper } from '@infrastructure/FetchWrapper/FetchWrapper'

const BASE_URL = process.env.NEXT_PUBLIC_APP_API

export class InterestConnector {
    static async InterestSend(body) {
        return await fetchWrapper.post(`${BASE_URL}/auth/send-request`, { body })
    }

    static async PendingRequest() {
        return await fetchWrapper.get(`${BASE_URL}/auth/pending-request`, {})
    }

    static async FriendRequests(body) {
        return await fetchWrapper.post(`${BASE_URL}/auth/friend-requests`, { body })
    }

    static async MyFriendsListRequest(body) {
        return await fetchWrapper.get(`${BASE_URL}/auth/friends`, { body })
    }
}
