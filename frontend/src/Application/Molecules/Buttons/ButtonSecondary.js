import PropTypes from 'prop-types'

import { ButtonSecondaryStyled } from './Button.Style'

export const ButtonSecondary = ({ children, ...rest }) => {
    return (
        <ButtonSecondaryStyled variant="contained" {...rest}>
            {children}
        </ButtonSecondaryStyled>
    )
}

ButtonSecondary.propTypes = {
    children: PropTypes.node,
}
