import { AuthConnector } from '@infrastructure/Connectors/AuthConnectors'
import { mapSignUpDataToFormData } from '@store/Mappers/AuthMappers/AuthMappers'
import {
    CreateErrorFiledWise,
    CreateErrorServiceResponse,
    CreateSuccessServiceResponse,
    CreateUnknownErrorServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const SignupRequest = async (formData) => {
    try {
        let convertedFormData = mapSignUpDataToFormData(formData)

        const { data, errors, code } = await AuthConnector.signup(convertedFormData)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }

        if (code == 422) {
            const fieldWiseErrors = CreateErrorFiledWise(errors)

            return CreateValidationErrorServiceResponse(fieldWiseErrors)
        }

        return CreateErrorServiceResponse(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
