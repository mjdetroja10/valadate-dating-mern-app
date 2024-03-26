import { unAuthorized } from '@application/Utils/GeneralUtility'
import { PublicConnector } from '@infrastructure/Connectors/PublicConnector'

export const getDiscoverListRequest = async (setDiscoverDetails, query, setHasMore) => {
    try {
        // const response = await PublicConnector.discoveryList(query)
        const { data, errors, code } = await PublicConnector.discoveryList(query)

        console.log(data, 'request')

        if (code === 401) unAuthorized(errors)

        if (data) {
            if (data?.data?.data.length == 0) {
                setHasMore(false)
            } else {
                setDiscoverDetails((prev) => [...prev, ...data?.data?.data])
            }
        }
    } catch (error) {
        console.log(error)
    }
}
