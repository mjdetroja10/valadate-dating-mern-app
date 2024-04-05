import { unAuthorized } from '@application/Utils/GeneralUtility'
import { PublicConnector } from '@infrastructure/Connectors/PublicConnector'
import { CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const getDiscoverListRequest = async (setDiscoverDetails, query, setHasMore) => {
    try {
        const { data, errors, code } = await PublicConnector.discoveryList(query)

        if (code === 401) unAuthorized(errors)

        if (data) {
            if (data?.data.length < query.pageSize || data?.data.length === 0) {
                setHasMore(false)
            } else {
                setDiscoverDetails((prev) => [...prev, ...data?.data])
            }
        }
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
