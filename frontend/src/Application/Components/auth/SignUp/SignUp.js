'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { LOGIN_URL } from '@application/Constants/RoutesConstants'
import { formDefaultValues, formErrorKeys, USER_INTERESTS, USER_PARTY } from '@application/Constants/SignUpConstants'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { HeaderComponent } from '@application/Layouts/HeaderComponent/HeaderComponent'
import { ButtonPrimary } from '@application/Molecules/Buttons/ButtonPrimary'
import { Box } from '@mui/material'
import { SignupRequest } from '@store/Requests/SignupRequest'

import { AgeRangeCategory } from './AgeRangeCategory/AgeRangeCategory'
import { DaterForm } from './DaterForm/DaterForm'
import { InterestCategory } from './InterestCategory/InterestCategory'
import { LocationForm } from './LocationForm/LocationForm'
import { LookingForCategory } from './LookingForCategory/LookingForCategory'
import { UserGenderCategory } from './UserGenderCategory/UserGenderCategory'
import { UserImages } from './UserImages/UserImages'

const onError = (setError, setSteps) => (errors) => {
    if (Array.isArray(errors)) {
        if (errors.length > 0) {
            let success = false
            errors.forEach((error) => {
                setError(error?.fieldname, { message: error?.message })
                if (formErrorKeys[error?.fieldname] && !success) {
                    success = true
                    setSteps(formErrorKeys[error?.fieldname])
                }
            })
        }
    }
}

const onSuccess = (router) => () => {
    router.push(LOGIN_URL)
}

const prevStep = (steps, setSteps) => () => {
    if (steps !== 1) setSteps(steps - 1)
}

const nextStep = (steps, setSteps, errors) => () => {
    if (Object.keys(errors).length > 0) return null
    if (steps !== 7) setSteps(steps + 1)
}

const stepperComponents = (steps, progress, { interestCategoryOptions, partyHabitsOptions }) => {
    switch (steps) {
        case 1:
            return <DaterForm progress={progress} />

        case 2:
            return <LocationForm progress={progress} />

        case 3:
            return <UserGenderCategory progress={progress} />

        case 4:
            return <LookingForCategory progress={progress} />

        case 5:
            return <InterestCategory progress={progress} interestOptions={interestCategoryOptions} />

        case 6:
            return <AgeRangeCategory progress={progress} habitsOptions={partyHabitsOptions} />

        case 7:
            return <UserImages progress={progress} />

        default:
            return null
    }
}

export const SignUp = () => {
    const methods = useForm({
        defaultValues: formDefaultValues,
    })
    const [steps, setSteps] = useState(1)

    const [categoryList] = useState({
        data: { interests: USER_INTERESTS, habits: USER_PARTY },
    })

    const progress = Math.floor((steps / 7) * 100)

    const interestCategoryOptions = useMemo(
        () =>
            categoryList?.data?.interests &&
            categoryList?.data?.interests.map((interest) => ({
                value: interest?.id,
                label: interest?.interestName,
            })),
        [categoryList?.data?.interests]
    )

    const partyHabitsOptions = useMemo(
        () =>
            categoryList?.data?.habits &&
            categoryList?.data?.habits.map((habit) => ({
                value: habit?.id,
                label: habit?.partyHabitName,
            })),
        [categoryList?.data?.habits]
    )

    const router = useRouter()

    const { handleSubmit, formState, setError } = methods

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: SignupRequest,
        onError: onError(setError, setSteps),
        onSuccess: onSuccess(router),
    })

    const onSubmit = async (data) => {
        nextStep(steps, setSteps, formState.errors)()

        if (steps === 7) {
            await formSubmit(data)
        }
    }

    return (
        <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <HeaderComponent>
                    <Box>
                        <ButtonPrimary sx={{ mr: 2 }} onClick={prevStep(steps, setSteps)} type="button">
                            Go Back
                        </ButtonPrimary>
                        <ButtonPrimary type="submit" disabled={formLoading}>
                            Continue
                        </ButtonPrimary>
                    </Box>
                </HeaderComponent>
                {stepperComponents(steps, progress, { interestCategoryOptions, partyHabitsOptions })}
            </Box>
        </FormProvider>
    )
}
