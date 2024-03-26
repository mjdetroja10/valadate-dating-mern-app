import { AuthConnector } from '@infrastructure/Connectors/AuthConnectors'
import { mapForgotPasswordDataToFormdata } from '@store/Mappers/AuthMappers/AuthMappers'
import {
    CreateErrorFiledWise,
    CreateErrorServiceResponse,
    CreateSuccessServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const ResetPassWordRequest = (id) => async (params) => {
    try {
        const convertedFormData = mapForgotPasswordDataToFormdata(params, id)
        const { data, errors, code } = await AuthConnector.ResetPassWord(convertedFormData)

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
