import { PublicConnector } from '@infrastructure/Connectors/PublicConnector'

export const singleDiscoverUserRequest = async (id, setUserProfileDetails) => {
    try {
        const { data, errors, code } = await PublicConnector.dicoverSingleUser(id)

        if (data) setUserProfileDetails(data?.data)

        console.log(data, errors, code, 'data, errors, code')
    } catch (error) {
        console.log(error)
    }
}
