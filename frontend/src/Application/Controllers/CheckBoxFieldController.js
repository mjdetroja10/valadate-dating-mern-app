import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox, FormControlLabel } from '@mui/material'

export const CheckBoxFieldController = (props) => {
    const { control } = useFormContext()

    const { labelPlacement = 'end', label, name, ...rest } = props

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Fragment>
                    <FormControlLabel
                        {...rest}
                        {...field}
                        label={label}
                        labelPlacement={labelPlacement}
                        control={<Checkbox />}
                    />
                </Fragment>
            )}
        />
    )
}

CheckBoxFieldController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    labelPlacement: PropTypes.string,
}
