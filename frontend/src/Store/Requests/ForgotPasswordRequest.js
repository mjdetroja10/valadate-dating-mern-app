import { AuthConnector } from '@infrastructure/Connectors/AuthConnectors'
import {
    CreateErrorFiledWise,
    CreateErrorServiceResponse,
    CreateSuccessServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const ForgotPasswordRequest = async (params) => {
    try {
        const { data, errors, code } = await AuthConnector.forgotPassword(params)

        if (data) {
            let getMessage = {
                data: data?.message,
            }
            return CreateSuccessServiceResponse(getMessage)
        }

        if (code == 422) {
            const fieldWiseErrors = CreateErrorFiledWise(errors)

            return CreateValidationErrorServiceResponse(fieldWiseErrors)
        }

        return CreateErrorServiceResponse(errors)
    } catch (error) {
        console.error(error)
    }
}
