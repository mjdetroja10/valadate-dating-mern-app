import { RESPONSE_STATUS } from '@store/StoreUtility'
import { useState } from 'react'

export const useFetch = ({ request, onSuccess, onError = () => {} }) => {
    const [loading, setLoading] = useState(true)

    async function fetchRequest() {
        setLoading(true)
        const response = await request()
        setLoading(false)

        if (response?.status === RESPONSE_STATUS.SUCCESS) {
            onSuccess(response?.data)
            return
        }

        if (response?.status === RESPONSE_STATUS.ERROR) {
            onError(response?.errors)
            return
        }
    }

    return { fetchRequest, loading }
}
