import { useState } from 'react'    

import { hasValidationError } from '@store/StoreUtility'

export const useFormSubmit = ({ requestMethod, onSuccess, onError }) => {
    const [formLoading, setLoading] = useState(false)

    async function formSubmit(formData) {
        setLoading(true)

        const response = await requestMethod(formData)

        setLoading(false)

        if (response?.status === 'SUCCESS') {
            onSuccess(response.data)
            return
        }

        if (hasValidationError(response)) {
            onError(response.errors)
            return
        }

        response && onError(response?.message)
    }

    return [formSubmit, formLoading]
}
