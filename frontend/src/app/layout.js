import PropTypes from 'prop-types'

import { AppProvider } from '@application/AppProvider'
import '/styles/global.css'

export const metadata = {
    manifest: '/manifest.json',
    title: 'VALADATE',
    description: 'Common Threads Leading To Uncommon Connections',
}

export const viewport = {
    themeColor: '#F9DB6D',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    )
}

RootLayout.propTypes = {
    children: PropTypes.node,
}
