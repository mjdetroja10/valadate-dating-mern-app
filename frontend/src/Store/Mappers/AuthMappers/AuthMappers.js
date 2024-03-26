export const ageRangeSettingMappers = ({ ageRange, ...rest }) => {
    return { ageRange: Array.isArray(ageRange) ? ageRange.join('-') : ageRange.toString(), ...rest }
}

export const mapSignUpDataToFormData = (params) => {
    const formData = new FormData()

    Object.keys(params)
        .filter((key) => key !== 'images')
        .forEach((key) => {
            if (Array.isArray(params[key])) {
                params[key].forEach((nestedKey, index) => {
                    formData.append(`${key}[${index}]`, nestedKey)
                })
            } else {
                formData.append(key, params[key])
            }
        })

    params.images.forEach((image) => formData.append(`images`, image))

    return formData
}

export const mapForgotPasswordDataToFormdata = (params, id) => {
    return { password: params.password, code: id }
}
