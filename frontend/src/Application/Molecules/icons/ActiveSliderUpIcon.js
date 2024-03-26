import PropTypes from 'prop-types'

export const ActiveSliderUpIcon = ({ width, height, className }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 186 226"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24 1H9C4.58172 1 1 4.58172 1 9V15V22M162 225H177C181.418 225 185 221.418 185 217V211V204"
                stroke="#145CA8"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

ActiveSliderUpIcon.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string,
}
