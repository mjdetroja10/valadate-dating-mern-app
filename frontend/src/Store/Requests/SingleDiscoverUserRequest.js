import { unAuthorized } from '@application/Utils/GeneralUtility'
import { PublicConnector } from '@infrastructure/Connectors/PublicConnector'
import {
    CreateSuccessServiceResponse,
    CreateUnknownErrorServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const singleDiscoverUserRequest = (id) => async () => {
    try {
        const { data, errors, code } = await PublicConnector.dicoverSingleUser(id)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }
        if (code === 401) unAuthorized(errors)

        if (errors) CreateValidationErrorServiceResponse(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
