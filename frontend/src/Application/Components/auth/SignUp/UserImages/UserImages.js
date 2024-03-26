import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { FileUploadController } from '@application/Controllers/FileUploadController'
import { Container, Grid, Typography } from '@mui/material'

import { FormProgress } from '../FormProgress/FormProgress'
import { SignUpWrapper } from '../SignUp.style'

export const UserImages = ({ progress }) => {
    const {
        formState: { errors },
    } = useFormContext()

    const profileImgErrors = useMemo(() => {
        if (!errors?.images) return null
        if (errors?.images.length > 0) {
            return 'You have to select two images atleast'
        }
    }, [errors?.images])

    return (
        <SignUpWrapper>
            <FormProgress value={progress} />
            <Container>
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <Typography variant="h4">Please add some pictures to your profile (at least two)</Typography>

                        {profileImgErrors && (
                            <Typography variant="body2" color="red">
                                {profileImgErrors}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item lg={3}>
                        <FileUploadController
                            rules={{
                                required: { value: true, message: 'Profile Image is a Required Filed' },
                            }}
                            name={`images[0]`}
                        />
                    </Grid>

                    <Grid item lg={3}>
                        <FileUploadController
                            rules={{
                                required: { value: true, message: 'Profile Image is a Required Filed' },
                            }}
                            name={`images[1]`}
                        />
                    </Grid>

                    <Grid item lg={3}>
                        <FileUploadController name={`images[2]`} />
                    </Grid>

                    <Grid item lg={3}>
                        <FileUploadController name={`images[3]`} />
                    </Grid>

                    <Grid item lg={3}>
                        <FileUploadController name={`images[4]`} />
                    </Grid>
                </Grid>
            </Container>
        </SignUpWrapper>
    )
}

UserImages.propTypes = {
    progress: PropTypes.number,
}
