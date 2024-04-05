import { MyProfile } from '@application/Components/MyProfile/MyProfile'
import { jwtDecrypt } from '@application/Utils/TokenDecodeUtility'
import { cookies } from 'next/headers'
import React from 'react'

const MyProfilePage = () => {
    let token = cookies().get('token')?.value

    let user = (token = token ? jwtDecrypt(token) : '')

    return <MyProfile user={user} />
}

export default MyProfilePage
