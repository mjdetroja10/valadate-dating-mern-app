import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { EyeHideIcon } from '@application/Molecules/icons/EyeHideIcon'
import { EyeShowIcon } from '@application/Molecules/icons/EyeShowIcon'
import { IconButton, InputLabel, TextField, Typography } from '@mui/material'

export const PasswordFieldController = (props) => {
    const [show, setShow] = useState(false)
    const [typeInput, setTypeInput] = useState('password')

    const {
        control,
        formState: { errors },
    } = useFormContext()

    const { name, label, variant = 'standard', rules, inputType = typeInput, ...rest } = props

    const handleShow = () => {
        setShow(!show)
        if (!show) {
            setTypeInput('text')
        } else {
            setTypeInput('password')
        }
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <Fragment>
                    {label && <InputLabel>{label}</InputLabel>}
                    <TextField
                        type={inputType}
                        {...rest}
                        {...field}
                        variant={variant}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleShow}>
                                    {!show ? (
                                        <EyeShowIcon width={20} height={14} />
                                    ) : (
                                        <EyeHideIcon width={20} height={14} />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />
                    <Typography variant="body2" color="red">
                        {errors[name]?.message}
                    </Typography>
                </Fragment>
            )}
        />
    )
}

PasswordFieldController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    variant: PropTypes.string,
    inputType: PropTypes.string,
    rules: PropTypes.object,
}
