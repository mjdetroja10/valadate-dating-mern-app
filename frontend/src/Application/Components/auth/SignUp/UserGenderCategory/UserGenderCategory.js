import { RadioButtonFieldController } from '@application/Controllers/RadioButtonFieldController'
import { Grid } from '@mui/material'

import { genderValidation } from '../Validation/Validation'

const genderList = [
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female',
    },
    {
        label: 'Non-Binary',
        value: 'nonBinary',
    },
    {
        label: 'Prefer Not To Say',
        value: 'preferNotToSay',
    },
]

export const UserGenderCategory = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} xs={12}>
                <RadioButtonFieldController
                    title="I am a..."
                    name="gender"
                    options={genderList}
                    rules={genderValidation.gender}
                />
            </Grid>
        </Grid>
    )
}
