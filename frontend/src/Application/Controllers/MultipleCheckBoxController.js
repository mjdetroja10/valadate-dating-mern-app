import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Typography } from '@mui/material'

import {
    StyledCheckBoxFormGroup as FormGroup,
    StyledCheckBoxFormControlLabel as FormControlLabel,
    StyledCheckbox as Checkbox,
} from './styles/controller.styled'

const handleOnChange =
    (elementValue, value = [], onChange) =>
    () => {
        let LatestValues = []
        if (value.includes(elementValue)) {
            LatestValues = value.filter((item) => item !== elementValue)
        } else {
            LatestValues = value.concat([elementValue])
        }
        onChange(LatestValues)
    }

export const MultipleCheckBoxController = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const { name, options = [], label, rules, ...rest } = props

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value: fieldValue, onChange, ...fieldrest } }) => (
                <Fragment>
                    <Typography variant="h5" sx={{ marginBottom: '24px' }}>
                        {label}
                    </Typography>
                    <FormGroup>
                        {options.length > 0 &&
                            options.map(({ label, value }) => {
                                return (
                                    <FormControlLabel
                                        className={fieldValue && fieldValue.indexOf(value) !== -1 ? 'Checked' : ''}
                                        key={value}
                                        onChange={handleOnChange(value, fieldValue, onChange)}
                                        {...fieldrest}
                                        {...rest}
                                        control={<Checkbox />}
                                        label={label}
                                        value={value}
                                    />
                                )
                            })}
                    </FormGroup>
                    <Typography variant="body2" color="red">
                        {errors[name]?.message}
                    </Typography>
                </Fragment>
            )}
        />
    )
}

MultipleCheckBoxController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    rules: PropTypes.object,
}
