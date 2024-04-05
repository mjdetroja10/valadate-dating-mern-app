import { PublicConnector } from '@infrastructure/Connectors/PublicConnector'

export const GetConfigRequest = async () => {
    try {
        return await PublicConnector.configs()
    } catch (error) {
        console.error(error)
    }
}
