import { RadioButtonFieldController } from '@application/Controllers/RadioButtonFieldController'
import { Grid } from '@mui/material'

import { genderValidation } from '../Validation/Validation'

const LookingForList = [
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
        label: 'Any',
        value: 'any',
    },
]

export const LookingForCategory = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} xs={12}>
                <RadioButtonFieldController
                    title="Looking for a..."
                    name="lookingFor"
                    options={LookingForList}
                    rules={genderValidation.lookingFor}
                />
            </Grid>
        </Grid>
    )
}
