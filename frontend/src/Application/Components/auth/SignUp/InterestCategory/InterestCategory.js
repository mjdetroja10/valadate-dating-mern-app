import PropTypes from 'prop-types'

import { MultipleCheckBoxController } from '@application/Controllers/MultipleCheckBoxController'
import { Grid, Typography } from '@mui/material'

import { interestValidations } from '../Validation/Validation'

export const InterestCategory = ({ interestOptions = [] }) => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12}>
                <Typography variant="h4" sx={{ marginBottom: '26px', fontWeight: 500 }}>
                    Now, let’s get to know you a little better! Please select up to 8 different interests!
                </Typography>
                <Wrapper>
                    <MultipleCheckBoxController
                        name="interests"
                        options={interestOptions}
                        label="Interests Category"
                        rules={interestValidations.interests}
                    />
                </Wrapper>
            </Grid>
        </Grid>
    )
}

InterestCategory.propTypes = {
    interestOptions: PropTypes.array,
}
