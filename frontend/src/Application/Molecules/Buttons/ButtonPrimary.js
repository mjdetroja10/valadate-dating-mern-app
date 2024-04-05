import PropTypes from 'prop-types'

import { ButtonPrimaryStyled } from './Button.Style'

export const ButtonPrimary = ({ variant = 'outlined', children, ...rest }) => {
    return (
        <ButtonPrimaryStyled {...rest} variant={variant}>
            {children}
        </ButtonPrimaryStyled>
    )
}

ButtonPrimary.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string,
}
