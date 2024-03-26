import { InterestConnector } from '@infrastructure/Connectors/InterestConnectors'

export const MyFriendsListRequest = async (setMyFriendsList) => {
    try {
        const { data } = await InterestConnector.MyFriendsListRequest()

        if (data) {
            setMyFriendsList(data?.data)
        }
    } catch (error) {
        console.error(error)
    }
}
