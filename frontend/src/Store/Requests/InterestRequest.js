import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'
import { CreateSuccessServiceResponse, CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const InterestRequest = async (params) => {
    try {
        const { data, errors } = await InterestConnector.InterestSend(params)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
