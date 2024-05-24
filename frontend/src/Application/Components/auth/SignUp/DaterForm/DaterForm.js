import { SIGNUP_THANKYOU_MESSAGE } from '@application/Constants/SignUpConstants'
import { PasswordFieldController } from '@application/Controllers/PasswordFieldController'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { Grid, Typography } from '@mui/material'

import { daterValdation } from '../Validation/Validation'

export const DaterForm = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12}>
                <Typography variant="h4" sx={{ marginBottom: '60px', fontWeight: 500 }}>
                    {SIGNUP_THANKYOU_MESSAGE}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item lg={6} xs={12}>
                        <TextFieldController name="firstName" label="First Name" rules={daterValdation.firstName} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextFieldController name="lastName" label="Last Name" rules={daterValdation.lastName} />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <TextFieldController name="email" label="Email" rules={daterValdation.email} />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <PasswordFieldController name="password" label="Password" rules={daterValdation.password} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
