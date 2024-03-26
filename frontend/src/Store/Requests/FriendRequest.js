import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'
import { CreateSuccessServiceResponse } from '@store/StoreUtility'

export const FriendRequest = async (params) => {
    try {
        console.log(params, 'aaaaaaa')
        const { data, errors } = await InterestConnector.FriendRequests(params)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }

        console.log(data, errors)
    } catch (error) {
        console.log(error)
    }
}
