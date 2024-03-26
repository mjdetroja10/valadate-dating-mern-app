'use client'

import PropTypes from 'prop-types'

import { MultipleCheckBoxController } from '@application/Controllers/MultipleCheckBoxController'
import { RangeSliderController } from '@application/Controllers/RangeSliderController'
import { Box, Container, Grid, Typography } from '@mui/material'

import { FormProgress } from '../FormProgress/FormProgress'
import { SignUpWrapper, WhiteBoxWrapper as Wrapper } from '../SignUp.style'
import { interestValidations } from '../Validation/Validation'

export const AgeRangeCategory = ({ progress, habitsOptions = [] }) => {
    return (
        <SignUpWrapper>
            <FormProgress value={progress} />
            <Container>
                <Grid container spacing={0}>
                    <Grid item lg={12}>
                        <Typography variant="h4" sx={{ marginBottom: '60px', fontWeight: 500 }}>
                            Great! Now, when you’re looking for your perfect match, do you have any deal breakers?
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
                                <Wrapper>
                                    <Typography variant="h5" sx={{ marginBottom: '60px', fontWeight: 500 }}>
                                        Age Range
                                    </Typography>
                                    <Box sx={{ width: { xl: '300px', sm: 'auto' } }}>
                                        <RangeSliderController name="ageRange" rules={interestValidations.ageRange} />
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{ marginBottom: '40px', marginTop: '40px', fontWeight: 500 }}
                                    >
                                        Party Habits
                                    </Typography>
                                    <MultipleCheckBoxController
                                        options={habitsOptions}
                                        name="habits"
                                        rules={interestValidations.habits}
                                    />
                                </Wrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </SignUpWrapper>
    )
}

AgeRangeCategory.propTypes = {
    nextStep: PropTypes.func,
    appMenu: PropTypes.array,
    progress: PropTypes.number,
    habitsOptions: PropTypes.array,
}
