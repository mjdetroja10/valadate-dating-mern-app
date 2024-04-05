'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { DISCOVER_URL, FORGOT_PASS_URL } from '@application/Constants/RoutesConstants'
import { CheckBoxFieldController } from '@application/Controllers/CheckBoxFieldController'
import { PasswordFieldController } from '@application/Controllers/PasswordFieldController'
import { TextFieldController } from '@application/Controllers/TextFieldController'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { ButtonSecondary } from '@application/Molecules/Buttons/ButtonSecondary'
import { validationErrors } from '@application/Utils/GeneralUtility'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, CircularProgress, InputLabel, Link, Snackbar, Stack } from '@mui/material'
import { LoginRequest } from '@store/Requests/LoginRequest'
import { addUser } from '@store/reducers/UserDetailsReducer'
import { jwtDecrypt } from '@application/Utils/TokenDecodeUtility'
import { useDispatch } from 'react-redux'

const onError = (setError, setErrorMessage) => (errors) => {
    if (typeof errors === 'string') {
        setErrorMessage(errors)
    }
    if (Array.isArray(errors)) validationErrors(errors, setError)
}

const onSuccess = (router, dispatch) => async (data) => {
    if (!data?.token) return null
    await Cookies.set('token', data.token, { expires: 1 })
    router.push(DISCOVER_URL)
    dispatch(addUser(jwtDecrypt(data.token)))
}

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState(null)

    const router = useRouter()

    const dispatch = useDispatch()

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
    })

    const methods = useForm({ defaultValues: { email: '', password: '' }, resolver: yupResolver(schema) })

    const { handleSubmit, setError } = methods

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: LoginRequest,
        onSuccess: onSuccess(router, dispatch),
        onError: onError(setError, setErrorMessage),
    })

    return (
        <FormProvider {...methods}>
            {errorMessage && (
                <Snackbar
                    open={Boolean(errorMessage)}
                    autoHideDuration={4000}
                    onClose={() => setErrorMessage('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert variant="outlined" severity="error" sx={{ mb: 4 }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
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
