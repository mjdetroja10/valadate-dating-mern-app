import { MessageConnector } from '@infrastructure/Connectors/MessageConnector'

export const EditMessageRequest = async (formData) => {
    try {
        const { data, errors } = await MessageConnector.editMessage(formData)

        if (data) return data
    } catch (error) {
        console.error(error, 'eeeeeeeeeeeeeeeeeee')
    }
}
