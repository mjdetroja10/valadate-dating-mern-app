import { useEffect, useState } from 'react'

export const useFetch = ({ request, onSuccess, onError }) => {
    const [loading, setLoading] = useState(false)

    async function fetchRequest() {
        setLoading(true)
        const response = await request()
        setLoading(false)
        console.log(response, 'response')

        if (response?.status === 'SUCCESS') {
            onSuccess(response?.data)
            return
        }

        if (response?.status === 'ERROR') {
            onError(response?.errors)
            return
        }
    }

    return { fetchRequest, loading }
}
