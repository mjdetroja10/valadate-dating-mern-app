'use client'

import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'

import { HeaderComponent } from './HeaderComponent/HeaderComponent'
import { SidebarComponent } from './SidebarComponent/SidebarComponent'
import { useDispatch } from 'react-redux'
import { userDetails } from '@application/Utils/TokenDecodeUtility'
import { addUser } from '@store/reducers/UserDetailsReducer'
import { generalSidebarList, profileSidebarList } from '@application/Constants/SidebarCostant'
import { Wrapper } from './AppLayout.styled'

export const AppLayout = (props) => {
    const { appMenu, hasMorePadding, sidebarShow = false, hasLessSpace = false, userProfile = false, children } = props

    const [toggleSidebar, setToggleSidebar] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        let userDetail = userDetails()
        if (userDetail) dispatch(addUser(userDetail))
    }, [])

    return (
        <React.Fragment>
            <HeaderComponent
                appMenu={appMenu}
                hasMorePadding={hasMorePadding}
                sidebarShow={sidebarShow}
                hasLessSpace={hasLessSpace}
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
            />
            {sidebarShow ? (
                <Fragment>
                    <SidebarComponent
                        sidebarData={userProfile ? profileSidebarList : generalSidebarList}
                        toggleSidebar={toggleSidebar}
                        setToggleSidebar={setToggleSidebar}
                    />
                    <Wrapper>{children}</Wrapper>
                </Fragment>
            ) : (
                children
            )}
        </React.Fragment>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node,
    appMenu: PropTypes.array,
    hasMorePadding: PropTypes.bool,
    sidebarShow: PropTypes.bool,
}
