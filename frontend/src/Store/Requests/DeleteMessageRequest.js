import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'

export const DeleteMessageRequest = async (id) => {
    try {
        const { data, errors } = await MessageConnector.deleteMessage(id)

        if (data) return data
    } catch (error) {
        console.error(error, 'eeeeeeeeeeeeeeeeeee')
    }
}
