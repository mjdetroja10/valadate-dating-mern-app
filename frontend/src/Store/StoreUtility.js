export const UNKNOW_ERROR = 'Internal server error'

export const CreateSuccessServiceResponse = (data) => {
    return {
        status: 'SUCCESS',
        message: data?.message,
        data: data?.data,
    }
}

export const CreateValidationErrorServiceResponse = (errors) => {
    return {
        status: 'ERROR',
        errors,
    }
}

export const CreateErrorFiledWise = (errors) => {
    return errors.map((e) => {
        return {
            fieldname: e.path,
            message: e.msg,
        }
    })
}

const isErrorResponse = (response) => response?.status == 'ERROR'

export const hasValidationError = (response) =>
    Boolean(response && isErrorResponse(response) && response.errors?.length)

export const CreateErrorServiceResponse = (errorMessage) => {
    return {
        status: 'ERROR',
        message: errorMessage,
    }
}

export const CreateUnknownErrorServiceResponse = () => {
    return {
        status: 'ERROR',
        message: UNKNOW_ERROR,
    }
}
