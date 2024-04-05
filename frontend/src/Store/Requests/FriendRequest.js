import { unAuthorized } from '@application/Utils/GeneralUtility'
import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'
import { CreateSuccessServiceResponse, CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const FriendRequest = async (params) => {
    try {
        const { data, errors, code } = await InterestConnector.FriendRequests(params)

        if (code === 401) unAuthorized(errors)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
