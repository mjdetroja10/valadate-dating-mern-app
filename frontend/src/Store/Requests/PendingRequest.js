import { unAuthorized } from '@application/Utils/GeneralUtility'
import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'
import { CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const PendingRequest = async (setPendingRequestList) => {
    try {
        const { data, errors, code } = await InterestConnector.PendingRequest()

        if (data) {
            setPendingRequestList(data?.data)
        }

        if (code === 401) unAuthorized(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
