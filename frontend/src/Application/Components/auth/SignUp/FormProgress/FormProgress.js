import PropTypes from 'prop-types'

import { LinearProgress } from '@mui/material'

export const FormProgress = ({ value }) => {
    return <LinearProgress thickness={8} value={value} variant="determinate" />
}

FormProgress.propTypes = {
    value: PropTypes.number,
}
