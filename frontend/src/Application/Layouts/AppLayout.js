'use client'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { HeaderComponent } from './HeaderComponent/HeaderComponent'
import { SidebarComponent } from './SidebarComponent/SidebarComponent'

export const AppLayout = ({ appMenu, hasMorePadding, children }) => {
    const [sidebarShow, setSidebarShow] = useState(false)

    return (
        <React.Fragment>
            <HeaderComponent
                appMenu={appMenu}
                hasMorePadding={hasMorePadding}
                setSidebarShow={setSidebarShow}
                sidebarShow={sidebarShow}
            />
            <SidebarComponent sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
            {children}
        </React.Fragment>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node,
    appMenu: PropTypes.array,
    hasMorePadding: PropTypes.bool,
}
