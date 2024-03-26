import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'

export const SendMessageRequest = async (formData) => {
    try {
        const { data, error } = await MessageConnector.sendMessage(formData)

        console.log(data, 'data')
    } catch (error) {
        console.error(error)
    }
}
