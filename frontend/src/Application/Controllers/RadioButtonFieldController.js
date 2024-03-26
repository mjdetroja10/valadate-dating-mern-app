import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormLabel, Typography } from '@mui/material'

import {
    StyledRadioGroup as RadioGroup,
    StyledRadioFormControlLabel as FormControlLabel,
    StyledRadio as Radio,
} from './styles/controller.styled'

export const RadioButtonFieldController = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const { name, options, title, rules, ...rest } = props

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, ...fieldrest } }) => (
                <Fragment>
                    {title && <FormLabel id="demo-radio-buttons-group-label">{title}</FormLabel>}
                    <RadioGroup>
                        {options.map((element) => {
                            return (
                                <FormControlLabel
                                    className={value === element.value ? 'Checked' : ''}
                                    {...rest}
                                    {...fieldrest}
                                    label={element.label}
                                    value={element.value}
                                    control={<Radio />}
                                    key={element.value}
                                />
                            )
                        })}
                    </RadioGroup>
                    <Typography variant="body2" color="red">
                        {errors[name]?.message}
                    </Typography>
                </Fragment>
            )}
        />
    )
}

RadioButtonFieldController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    labelPlacement: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    rules: PropTypes.object,
}
