import PropTypes from 'prop-types'

export const SendIcon = ({ width, height }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#145CA8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 13.225L19.4978 14.7948L17.0622 12.2496L17.0622 22.89C17.0622 23.503 16.5866 24 16 24C15.4133 24 14.9378 23.503 14.9378 22.89L14.9378 12.2496L12.5022 14.7948L11 13.225L16 8L21 13.225Z"
                fill="#FBFDFF"
            />
        </svg>
    )
}

SendIcon.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onClick: PropTypes.func,
}
