'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AlertComponent } from '@application/Atoms/Alert/AlertComponent'
import { LOGIN_URL } from '@application/Constants/RoutesConstants'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { AppLayout } from '@application/Layouts/AppLayout'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { validationErrors } from '@application/Utils/GeneralUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, Container, Grid, Link as TextLink } from '@mui/material'
import { ForgotPasswordRequest } from '@store/Requests/ForgotPasswordRequest'

import { SignUpWrapper as Wrapper } from '../SignUp/SignUp.style'

const onError = (setError, setErrMessage) => (errors) => {
    if (typeof errors === 'string') {
        setErrMessage({ type: 'error', message: errors?.message || 'Something Went Wrong' })
    }

    if (Array.isArray(errors)) validationErrors(errors, setError)
}

const onSuccess = (setSuccessMessage) => (message) => {
    setSuccessMessage({ type: 'success', message })
}

const forgotPasswordValidator = yup.object().shape({
    email: yup.string().email().required(),
})

export const ForgotPassword = () => {
    const [alertMsg, setAlertMsg] = useState(null)

    const methods = useForm({
        defaultValues: { email: '' },
        resolver: yupResolver(forgotPasswordValidator),
    })

    const { handleSubmit, setError } = methods

    const alertMessage = useMemo(() => {
        if (alertMsg?.type && alertMsg?.message)
            return <AlertComponent severity={alertMsg?.type} message={alertMsg.message} title={alertMsg?.type} />
    }, [alertMsg?.message, alertMsg?.type])

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: ForgotPasswordRequest,
        onError: onError(setError, setAlertMsg),
        onSuccess: onSuccess(setAlertMsg),
    })

    return (
        <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(formSubmit)}>
                <AppLayout>
                    <Wrapper>
                        <Container>
                            <Grid container justifyContent="center" spacing={0}>
                                <Grid item lg={8}>
                                    {alertMessage}
                                    <TextFieldController name="email" label="Email" />
                                    <TextLink href={LOGIN_URL} color="black.medium" component={Link}>
                                        Back to Login
                                    </TextLink>
                                    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                                        <ButtonPrimary
                                            type="submit"
                                            disabled={formLoading}
                                            endIcon={
                                                formLoading && (
                                                    <CircularProgress size={20} sx={{ color: 'blue.b700' }} />
                                                )
                                            }
                                        >
                                            Submit
                                        </ButtonPrimary>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Wrapper>
                </AppLayout>
            </Box>
        </FormProvider>
    )
}
