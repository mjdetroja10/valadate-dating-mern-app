import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'
import { CreateSuccessServiceResponse } from '@store/StoreUtility'

export const InterestRequest = async (params) => {
    try {
        const { data, errors } = await InterestConnector.InterestSend(params)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }

        console.log(data, errors)
    } catch (error) {
        console.log(error)
    }
}
