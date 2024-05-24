'use client'

import PropTypes from 'prop-types'

import { APP_MENU_TYPES } from '@application/Constants/AppMenuConstant'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { HamBurgerIcon } from '@application/Molecules/icons/HamBurgerIcon'
import { LogoIcon } from '@application/Molecules/icons/LogoIcon'
import theme from '@application/Themes'
import { AppBar, Toolbar, Typography, IconButton, Link, useMediaQuery } from '@mui/material'

import { HeaderMainWrap as Header, NavbarLinkStyled as NavLink, NavLinkWrapper } from './Header.style'
import MobileLogo from '@public/assets/images/Valadate_Logo 1.png'

import Image from 'next/image'

const modifiedHeader = (item) => {
    switch (item.type) {
        case APP_MENU_TYPES.BUTTON:
            return (
                <ButtonPrimary type="button" onClick={item?.action}>
                    {item.title}
                </ButtonPrimary>
            )

        case APP_MENU_TYPES.COMPONENT:
            return item.component

        case APP_MENU_TYPES.ICON_BTN:
            return <IconButton>{item.content}</IconButton>

        default:
            return item.title
    }
}

export const HeaderComponent = ({
    appMenu = [],
    hasMorePadding = false,
    hasLessSpace = false,
    toggleSidebar,
    setToggleSidebar,
    children,
}) => {
    const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Header>
                <AppBar elevation={1} color="white" position="fixed" component="nav">
                    <Toolbar sx={{ justifyContent: 'space-between', padding: 2, display: { sm: 'flex' } }}>
                        <Typography component={Link} href="/">
                            {isMobileSize ? (
                                <Image src={MobileLogo} width={35} height={42} />
                            ) : (
                                <LogoIcon width={!isMobileSize ? 213 : 170} height={!isMobileSize ? 50 : 32} />
                            )}
                        </Typography>

                        <IconButton onClick={() => setToggleSidebar(!toggleSidebar)} sx={{ display: { md: 'none' } }}>
                            <HamBurgerIcon />
                        </IconButton>

                        {appMenu.length > 0 &&
                            appMenu.map((element, index) => {
                                if (element.group.length > 0) {
                                    return (
                                        <NavLinkWrapper key={index}>
                                            {element.group.map((item) => (
                                                <NavLink
                                                    key={item.title}
                                                    component={item.path ? Link : ''}
                                                    variant="h5"
                                                    underline="none"
                                                    href={item.path ? item.path : ''}
                                                    sx={{
                                                        width:
                                                            item.type === APP_MENU_TYPES.ICON_BTN
                                                                ? '100% !important'
                                                                : 'auto',
                                                        padding: hasMorePadding
                                                            ? {
                                                                  sm: theme.spacing(0, 2),
                                                                  lg: theme.spacing(0, 7),
                                                              }
                                                            : theme.spacing(0, hasLessSpace ? 0.5 : 2),
                                                    }}
                                                >
                                                    {modifiedHeader(item)}
                                                </NavLink>
                                            ))}
                                        </NavLinkWrapper>
                                    )
                                }
                                return null
                            })}
                        {children}
                    </Toolbar>
                </AppBar>
            </Header>
        </>
    )
}

HeaderComponent.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    sidebarShow: PropTypes.bool,
    setSidebarShow: PropTypes.func,
    appMenu: PropTypes.array,
    hasMorePadding: PropTypes.bool,
    children: PropTypes.node,
}
