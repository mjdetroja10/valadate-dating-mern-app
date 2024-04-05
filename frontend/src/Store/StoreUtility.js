export const UNKNOW_ERROR = 'Internal server error'

export const RESPONSE_STATUS = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

export const CreateSuccessServiceResponse = (data) => {
    return {
        status: RESPONSE_STATUS.SUCCESS,
        message: data?.message,
        data: data?.data,
    }
}

export const CreateValidationErrorServiceResponse = (errors) => {
    return {
        status: RESPONSE_STATUS.ERROR,
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

const isErrorResponse = (response) => response?.status == RESPONSE_STATUS.ERROR

export const hasValidationError = (response) =>
    Boolean(response && isErrorResponse(response) && response.errors?.length)

export const CreateErrorServiceResponse = (errorMessage) => {
    return {
        status: RESPONSE_STATUS.ERROR,
        message: errorMessage,
    }
}

export const CreateUnknownErrorServiceResponse = () => {
    return {
        status: RESPONSE_STATUS.ERROR,
        message: UNKNOW_ERROR,
    }
}
