import PropTypes from 'prop-types'

export const QuoteIcon = ({ height, width }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.1489 0L13.7234 38.0383H21.383V75H0V38.0383L7.97872 0H19.1489ZM57.766 0L52.3404 38.0383H60V75H38.617V38.0383L46.5957 0H57.766Z"
                fill="#145CA8"
            />
        </svg>
    )
}

QuoteIcon.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
}
