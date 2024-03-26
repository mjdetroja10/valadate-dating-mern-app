import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'
import { CreateSuccessServiceResponse, CreateValidationErrorServiceResponse } from '@store/StoreUtility'

export const GetMessagesRequest = (id, setMessages) => async () => {
    try {
        const { data, errors } = await MessageConnector.getMessages(id)

        if (data) {
            return CreateSuccessServiceResponse(data)
        }

        if (errors) CreateValidationErrorServiceResponse(errors)
    } catch (error) {
        console.error(error)
    }
}
