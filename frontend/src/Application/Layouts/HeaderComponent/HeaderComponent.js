'use client'

import PropTypes from 'prop-types'

import { APP_MENU_TYPES } from '@application/Constants/AppMenuConstant'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { HamBurgerIcon } from '@application/Molecules/icons/HamBurgerIcon'
import { LogoIcon } from '@application/Molecules/icons/LogoIcon'
import theme from '@application/Themes'
import { AppBar, Box, Toolbar, Typography, IconButton, Link, useMediaQuery } from '@mui/material'

import { HeaderMainWrap as Header, NavbarLinkStyled as NavLink } from './Header.style'

const modifiedHeader = (item) => {
    switch (item.type) {
        case APP_MENU_TYPES.BUTTON:
            return (
                <ButtonPrimary type="button" onClick={item?.action}>
                    {item.title}
                </ButtonPrimary>
            )

        case APP_MENU_TYPES.ICON:
            return item.icon

        case APP_MENU_TYPES.PICTURE:
            return (
                // eslint-disable-next-line
                <img
                    src="https://images.pexels.com/photos/18254632/pexels-photo-18254632/free-photo-of-portrait-of-brunette-woman-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    style={{ height: 40, width: 40, borderRadius: '50%', objectFit: 'cover' }}
                    alt="User Image"
                />
            )

        default:
            return item.title
    }
}

export const HeaderComponent = ({ appMenu = [], setSidebarShow, sidebarShow, hasMorePadding = false, children }) => {
    const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Header>
                <AppBar elevation={1} color="white" position="fixed" component="nav">
                    <Toolbar sx={{ justifyContent: 'space-between', padding: 2, display: { sm: 'flex' } }}>
                        <Typography component={Link} href="/">
                            <LogoIcon width={!isMobileSize ? 213 : 170} height={!isMobileSize ? 50 : 32} />
                        </Typography>

                        <IconButton onClick={() => setSidebarShow(!sidebarShow)} sx={{ display: { md: 'none' } }}>
                            <HamBurgerIcon />
                        </IconButton>

                        {appMenu.length > 0 &&
                            appMenu.map((element, index) => {
                                if (element.group.length > 0) {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: { xs: 'none', sm: 'none', md: 'flex', alignItems: 'center' },
                                            }}
                                        >
                                            {element.group.map((item) => (
                                                <NavLink
                                                    key={item.title}
                                                    component={Link}
                                                    variant="h5"
                                                    underline="none"
                                                    href={item.path ? item.path : ''}
                                                    sx={{
                                                        padding: hasMorePadding
                                                            ? {
                                                                  sm: theme.spacing(0, 2),
                                                                  lg: theme.spacing(0, 7),
                                                              }
                                                            : theme.spacing(0, 2),
                                                        display: { xs: 'block' },
                                                        width: '100%',
                                                    }}
                                                >
                                                    {modifiedHeader(item)}
                                                </NavLink>
                                            ))}
                                        </Box>
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
