import { unAuthorized } from '@application/Utils/GeneralUtility'
import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'
import {
    CreateSuccessServiceResponse,
    CreateUnknownErrorServiceResponse,
    CreateValidationErrorServiceResponse,
} from '@store/StoreUtility'

export const GetMessagesRequest = (id, setMessages) => async () => {
    try {
        const { data, errors, code } = await MessageConnector.getMessages(id)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }
        if (code === 401) unAuthorized(errors)

        if (errors) CreateValidationErrorServiceResponse(errors)
    } catch (error) {
        return CreateUnknownErrorServiceResponse()
    }
}
