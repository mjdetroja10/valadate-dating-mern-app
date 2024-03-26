import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { InputLabel, TextField, Typography } from '@mui/material'

export const TextFieldController = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const { name, label, variant = 'standard', inputType = 'text', rules, ...rest } = props

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <Fragment>
                    {label && <InputLabel>{label}</InputLabel>}
                    <TextField type={inputType} {...rest} {...field} variant={variant} fullWidth />

                    <Typography variant="body2" color="red">
                        {errors[name]?.message}
                    </Typography>
                </Fragment>
            )}
        />
    )
}

TextFieldController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    variant: PropTypes.string,
    inputType: PropTypes.string,
    rules: PropTypes.object,
}
