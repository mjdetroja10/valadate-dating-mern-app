import { unAuthorized } from '@application/Utils/GeneralUtility'
import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'
import { CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const SendMessageRequest = async (formData) => {
    try {
        const { data, errors, code } = await MessageConnector.sendMessage(formData)

        if (data) return data?.data

        if (code === 401) unAuthorized(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
