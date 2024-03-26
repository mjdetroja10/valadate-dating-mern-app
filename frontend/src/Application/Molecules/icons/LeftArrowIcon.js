import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const LeftArrowIcon = ({ width, height, onClick }) => {
    return (
        <Box className="prevIcon">
            <svg
                width={width}
                height={height}
                onClick={onClick}
                viewBox="0 0 25 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M23 2L3 22L23 42" stroke="#5AA1EC" strokeWidth="3" />
            </svg>
        </Box>
    )
}

LeftArrowIcon.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onClick: PropTypes.func,
}
