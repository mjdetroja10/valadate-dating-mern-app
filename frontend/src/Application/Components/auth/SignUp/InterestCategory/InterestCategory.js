import PropTypes from 'prop-types'

import { MultipleCheckBoxController } from '@application/Controllers/MultipleCheckBoxController'
import { Container, Grid, Typography } from '@mui/material'

import { FormProgress } from '../FormProgress/FormProgress'
import { SignUpWrapper, WhiteBoxWrapper as Wrapper } from '../SignUp.style'
import { interestValidations } from '../Validation/Validation'

export const InterestCategory = ({ progress, interestOptions = [] }) => {
    return (
        <SignUpWrapper>
            <FormProgress value={progress} />
            <Container>
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
            </Container>
        </SignUpWrapper>
    )
}

InterestCategory.propTypes = {
    nextStep: PropTypes.func,
    appMenu: PropTypes.array,
    progress: PropTypes.number,
    interestOptions: PropTypes.array,
}
