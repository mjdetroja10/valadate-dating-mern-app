import { AuthConnector } from '@infrastructure/Connectors/AuthConnectors'
import {
    CreateErrorFiledWise,
    CreateErrorServiceResponse,
    CreateSuccessServiceResponse,
    CreateUnknownErrorServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const LoginRequest = async (params) => {
    try {
        const { data, errors, code } = await AuthConnector.login(params)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }

        if (code == 422) {
            const fieldWiseErrors = CreateErrorFiledWise(errors)

            return CreateValidationErrorServiceResponse(fieldWiseErrors)
        }

        return CreateErrorServiceResponse(errors)
    } catch (errors) {
        return CreateUnknownErrorServiceResponse()
    }
}
