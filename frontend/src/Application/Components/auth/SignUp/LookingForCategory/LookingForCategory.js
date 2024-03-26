import PropTypes from 'prop-types'

import { RadioButtonFieldController } from '@application/Controllers/RadioButtonFieldController'
import { Container, Grid } from '@mui/material'

import { FormProgress } from '../FormProgress/FormProgress'
import { SignUpWrapper } from '../SignUp.style'
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

export const LookingForCategory = ({ progress }) => {
    return (
        <SignUpWrapper>
            <FormProgress value={progress} />
            <Container>
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
            </Container>
        </SignUpWrapper>
    )
}

LookingForCategory.propTypes = {
    nextStep: PropTypes.func,
    appMenu: PropTypes.array,
    progress: PropTypes.number,
}
