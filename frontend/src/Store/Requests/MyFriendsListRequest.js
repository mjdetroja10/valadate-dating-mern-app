import { unAuthorized } from '@application/Utils/GeneralUtility'
import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'
import {
    CreateSuccessServiceResponse,
    CreateUnknownErrorServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const MyFriendsListRequest = async () => {
    try {
        const { data, code, errors } = await InterestConnector.MyFriendsListRequest()

        if (code === 401) unAuthorized(errors)

        if (data) {
            // setMyFriendsList(data?.data)
            return CreateSuccessServiceResponse(data)
        }

        if (errors) CreateValidationErrorServiceResponse(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
