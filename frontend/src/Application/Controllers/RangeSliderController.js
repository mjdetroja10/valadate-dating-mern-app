import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

import { Slider } from '@mui/material'

let sliderMinDistance = 5

export const RangeSliderController = (props) => {
    const { control } = useFormContext()

    const { name, rules, ...rest } = props

    const handleChange = (value, onChange) => (e, newValue, activeThumb) => {
        let minValue

        if (activeThumb === 0) {
            minValue = [Math.min(newValue[0], value[1] - sliderMinDistance), value[1]]
        } else {
            minValue = [value[0], Math.max(newValue[1], value[0] + sliderMinDistance)]
        }
        onChange(minValue)
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, ...fieldrest } }) => (
                <Slider
                    {...fieldrest}
                    {...rest}
                    getAriaLabel={() => 'Age Range'}
                    sx={{ color: 'blue.b700' }}
                    value={value}
                    onChange={handleChange(value, onChange)}
                    valueLabelDisplay="on"
                />
            )}
        />
    )
}

RangeSliderController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.array,
    setAgeLimit: PropTypes.func,
    rules: PropTypes.object,
}
