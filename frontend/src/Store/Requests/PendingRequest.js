import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'

export const PendingRequest = async (setPendingRequestList) => {
    try {
        const { data } = await InterestConnector.PendingRequest()

        if (data) {
            setPendingRequestList(data?.data)
        }

        // console.log(data, errors)
    } catch (error) {
        console.error(error)
    }
}
