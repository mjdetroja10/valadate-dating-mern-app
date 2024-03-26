import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const RightArrowIcon = ({ width, height, onClick }) => {
    return (
        <Box className="nextIcon">
            <svg
                width={width}
                height={height}
                onClick={onClick}
                viewBox="0 0 25 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M2 2L22 22L2 42" stroke="#5AA1EC" strokeWidth="3" />
            </svg>
        </Box>
    )
}

RightArrowIcon.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onClick: PropTypes.func,
}
