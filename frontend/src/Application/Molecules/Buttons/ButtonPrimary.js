import PropTypes from 'prop-types'

import { ButtonPrimaryStyled } from './Button.Style'

export const ButtonPrimary = ({ children, ...rest }) => {
    return (
        <ButtonPrimaryStyled {...rest} variant="outlined">
            {children}
        </ButtonPrimaryStyled>
    )
}

ButtonPrimary.propTypes = {
    children: PropTypes.node,
}
