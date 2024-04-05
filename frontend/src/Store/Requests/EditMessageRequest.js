import { unAuthorized } from '@application/Utils/GeneralUtility'
import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'
import { CreateUnknownErrorServiceResponse } from '@store/StoreUtility'

export const EditMessageRequest = async (formData) => {
    try {
        const { data, errors, code } = await MessageConnector.editMessage(formData)

        if (data) return data

        if (code === 401) unAuthorized(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
