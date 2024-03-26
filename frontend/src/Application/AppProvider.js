'use client'

import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@emotion/react'
import { store } from '@store/Store'

import theme from './Themes'

export const AppProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node,
}
