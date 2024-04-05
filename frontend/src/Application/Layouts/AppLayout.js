'use client'

import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'

import styled from '@emotion/styled'

import { HeaderComponent } from './HeaderComponent/HeaderComponent'
import { SidebarComponent } from './SidebarComponent/SidebarComponent'
import { useDispatch } from 'react-redux'
import { userDetails } from '@application/Utils/TokenDecodeUtility'
import { addUser } from '@store/reducers/UserDetailsReducer'
import { generalSidebarList, profileSidebarList } from '@application/Constants/SidebarCostant'
import { store } from '@store/Store'

const Wrapper = styled('div')({
    marginLeft: 290,
    marginTop: 100,

    '& .MuiAccordionSummary-content': {
        fontSize: '20px',
        alignItems: 'center',
        textTransform: 'capitalize',

        '& .MuiAvatar-root': {
            marginRight: '15px',
        },
    },

    '& .smallRoundImage': {
        marginRight: '15px',
    },

    '& .MuiTypography-body1': {
        fontSize: '20px',
    },
})

export const AppLayout = (props) => {
    const { appMenu, hasMorePadding, sidebarShow = false, hasLessSpace = false, userProfile = false, children } = props

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
            />
            {sidebarShow ? (
                <Fragment>
                    <SidebarComponent sidebarData={userProfile ? profileSidebarList : generalSidebarList} />
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
