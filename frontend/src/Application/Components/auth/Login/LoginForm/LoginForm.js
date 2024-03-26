'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

import { FORGOT_PASS_URL } from '@application/Constants/RoutesConstants'
import { CheckBoxFieldController } from '@application/Controllers/CheckBoxFieldController'
import { PasswordFieldController } from '@application/Controllers/PasswordFieldController'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { ButtonSecondary } from '@application/Molecules/Buttons/ButtonSecondary'
import { validationErrors } from '@application/Utils/GeneralUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, AlertTitle, Box, CircularProgress, InputLabel, Link, Stack } from '@mui/material'
import { LoginRequest } from '@store/Requests/LoginRequest'

const onError = (setError, setErrorMessage) => (errors) => {
    if (typeof errors === 'string') {
        setErrorMessage(errors)
    }
    if (Array.isArray(errors)) validationErrors(errors, setError)
}

const onSuccess = (router) => (data) => {
    router.push('/')
    Cookies.set('token', data.token, { expires: 1 })
}

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState(null)

    const router = useRouter()

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
    })

    const methods = useForm({ defaultValues: { email: '', password: '' }, resolver: yupResolver(schema) })

    const { handleSubmit, setError, setValue } = methods

    const { formDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        // eslint-disable-next-line
        if (formDetails.hasOwnProperty('email') && formDetails.hasOwnProperty('password')) {
            setValue('email', formDetails?.email)
            setValue('password', formDetails?.password)
        }
    }, [formDetails, setValue])

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: LoginRequest,
        onSuccess: onSuccess(router),
        onError: onError(setError, setErrorMessage),
    })

    return (
        <FormProvider {...methods}>
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit(formSubmit)}>
                <TextFieldController name="email" label="Email" />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <InputLabel>Password</InputLabel>
                    <Link href={FORGOT_PASS_URL} color="black.medium">
                        Forgot Password?
                    </Link>
                </Stack>

                <PasswordFieldController name="password" />
                <Box>
                    <CheckBoxFieldController name="rememberMe" label="Remember Me" />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <ButtonSecondary
                        type="submit"
                        disabled={formLoading}
                        endIcon={formLoading && <CircularProgress size={20} sx={{ color: 'blue.b700' }} />}
                    >
                        Log in
                    </ButtonSecondary>
                </Box>
            </Box>
        </FormProvider>
    )
}
