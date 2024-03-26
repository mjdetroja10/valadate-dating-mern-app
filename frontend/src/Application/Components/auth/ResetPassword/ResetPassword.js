'use client'

import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AlertComponent } from '@application/Atoms/Alert/AlertComponent'
import { PasswordFieldController } from '@application/Controllers/PasswordFieldController'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { AppLayout } from '@application/Layouts/AppLayout'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { validationErrors } from '@application/Utils/GeneralUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, Container, Grid } from '@mui/material'
import { ResetPassWordRequest } from '@store/Requests/ResetPasswordRequest'

import { SignUpWrapper as Wrapper } from '../SignUp/SignUp.style'

const ResetPassWordValidator = yup.object().shape({
    password: yup.string().min(8).max(32).required(),
    confirmpassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match'),
})

const onError = (setError, setErrMessage) => (errors) => {
    if (typeof errors === 'string') setErrMessage({ type: 'error', message: errors?.message || 'something went wrong' })

    if (Array.isArray(errors)) {
        validationErrors(errors, setError)
        if (errors.find(({ fieldname }) => fieldname === 'code'))
            setErrMessage({
                type: 'error',
                message: errors.find(({ fieldname }) => fieldname === 'code')?.message || 'something went wrong',
            })
    }
}

const onSuccess = (setSuccessMessage) => (message) => {
    setSuccessMessage({ type: 'success', message: message || 'successfully changed password' })
}

export const ResetPassword = () => {
    const [alertMsg, setAlertMsg] = useState({})

    const methods = useForm({
        defaultValues: { password: '', confirmpassword: '' },
        resolver: yupResolver(ResetPassWordValidator),
    })

    const { handleSubmit, setError } = methods

    const { id } = useParams()

    const alertMessage = useMemo(() => {
        if (alertMsg?.type && alertMsg?.message)
            return <AlertComponent severity={alertMsg?.type} message={alertMsg.message} title={alertMsg?.type} />
    }, [alertMsg.message, alertMsg?.type])

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: ResetPassWordRequest(id),
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
                                <Grid item lg={8} mb={2}>
                                    {alertMessage}
                                    <PasswordFieldController name="password" label="Password" />
                                </Grid>
                                <Grid item lg={8} mb={3}>
                                    <PasswordFieldController name="confirmpassword" label="Confirm Password" />
                                </Grid>
                                <Grid item lg={8}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <ButtonPrimary
                                            disabled={formLoading}
                                            type="submit"
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
