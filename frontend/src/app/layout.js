// import { Raleway } from 'next/font/google'
import PropTypes from 'prop-types'

import { AppProvider } from '@application/AppProvider'
import '/styles/global.css'

// const raleway = Raleway({ subsets: ['latin'] })

export const metadata = {
    title: 'VALADATE',
    description: 'Common Threads Leading To Uncommon Connections',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {/* <body className={raleway.className}> */}
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    )
}

RootLayout.propTypes = {
    children: PropTypes.node,
}
