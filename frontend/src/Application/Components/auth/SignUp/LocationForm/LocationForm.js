import { LIVE_IN, LOOKING_FOR } from '@application/Constants/SignUpConstants'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { Grid, Typography } from '@mui/material'

import { locationValidations } from '../Validation/Validation'

export const LocationForm = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12}>
                <Typography variant="h4" sx={{ marginBottom: '16px', fontWeight: 500 }}>
                    {LIVE_IN}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <TextFieldController name="city" label="City" rules={locationValidations.city} />
                    </Grid>
                    <Grid item lg={6}>
                        <TextFieldController name="state" label="State" rules={locationValidations.state} />
                    </Grid>
                    <Grid item lg={12}>
                        <TextFieldController name="zip" label="Zip Code" rules={locationValidations.zip} />
                    </Grid>
                    <Grid item lg={12}>
                        <Typography variant="h4" sx={{ marginBottom: '16px', fontWeight: 500, marginTop: '50px' }}>
                            {LOOKING_FOR}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <TextFieldController
                            inputType="number"
                            name="miles"
                            label="miles"
                            rules={locationValidations.miles}
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextFieldController
                            inputType="date"
                            name="birthDate"
                            label="birthdate"
                            rules={locationValidations.birthDate}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
