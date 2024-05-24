'use client'

import { USER_APP_MENU } from '@application/Constants/AppMenuConstant'
import { AppLayout } from '@application/Layouts/AppLayout'
import React from 'react'

export const DatingPreference = () => {
    return (
        <AppLayout appMenu={USER_APP_MENU()} sidebarShow={true} hasLessSpace={true} userProfile={true}>
            DatingPreference
        </AppLayout>
    )
}
