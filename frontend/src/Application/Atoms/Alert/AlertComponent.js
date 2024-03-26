import PropTypes from 'prop-types'

import { Alert, AlertTitle } from '@mui/material'

export const AlertComponent = ({ message, severity, title }) => {
    return (
        <Alert severity={severity} sx={{ mb: 4 }}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}

AlertComponent.propTypes = {
    message: PropTypes.string,
    severity: PropTypes.string,
    title: PropTypes.string,
}
