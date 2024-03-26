import PropTypes from 'prop-types'

import { RadioButtonFieldController } from '@application/Controllers/RadioButtonFieldController'
import { Container, Grid } from '@mui/material'

import { FormProgress } from '../FormProgress/FormProgress'
import { SignUpWrapper } from '../SignUp.style'
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

export const UserGenderCategory = ({ progress }) => {
    return (
        <SignUpWrapper>
            <FormProgress value={progress} />
            <Container>
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
            </Container>
        </SignUpWrapper>
    )
}

UserGenderCategory.propTypes = {
    nextStep: PropTypes.func,
    appMenu: PropTypes.array,
    progress: PropTypes.number,
}
