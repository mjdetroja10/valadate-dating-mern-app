import { AuthConnector } from '@infrastructure/Connectors/AuthConnectors'
import { CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const EmailVerifyRequest = async (params, setAlert) => {
    try {
        const { data, errors } = await AuthConnector.EmailVerify(params)

        let errorMsg = Array.isArray(errors)
            ? errors.find((item) => item)?.msg
            : typeof errors === 'string'
            ? errors
            : 'Token has been expired'

        if (data) setAlert((prev) => ({ ...prev, type: 'success', message: data?.message }))

        if (errors) setAlert((prev) => ({ ...prev, type: 'error', message: errorMsg }))
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
