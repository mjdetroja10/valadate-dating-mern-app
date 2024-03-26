export const daterValdation = {
    firstName: {
        required: {
            value: true,
            message: 'First Name is a Required Field',
        },
        pattern: { value: /^[a-zA-Z]+$/, message: 'only alphabets allowed' },
    },
    lastName: {
        required: {
            value: true,
            message: 'Last Name is a Required Field',
        },
        pattern: { value: /^[a-zA-Z]+$/, message: 'only alphabets allowed' },
    },
    email: {
        required: {
            value: true,
            message: 'Email is a Required Field',
        },
        pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: 'must be in email format',
        },
    },
    password: {
        required: {
            value: true,
            message: 'Password is a Required Field',
        },
        minLength: {
            value: 8,
            message: 'min 8 letter required',
        },
    },
}

export const locationValidations = {
    city: {
        required: {
            value: true,
            message: 'City is a Required Field',
        },
        pattern: { value: /^[a-zA-Z]+$/, message: 'only alphabets allowed' },
    },
    state: {
        required: {
            value: true,
            message: 'State is a Required Field',
        },
        pattern: { value: /^[a-zA-Z]+$/, message: 'only alphabets allowed' },
    },
    zip: {
        required: {
            value: true,
            message: 'Zip Code is a Required Field',
        },
        maxLength: {
            value: 6,
            message: 'Max Value is Six',
        },
        minLength: {
            value: 6,
            message: 'Min Value is Six',
        },
        pattern: { value: /^[0-9]+$/, message: 'only numbers allowed' },
    },
    miles: {
        required: {
            value: true,
            message: 'Miles is a Required Field',
        },
        pattern: { value: /^[0-9]+$/, message: 'only numbers allowed' },
    },
    birthDate: {
        required: {
            value: true,
            message: 'Birthdate is a Required Field',
        },
        pattern: { value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, message: 'must be in date format' },
    },
}

export const genderValidation = {
    gender: { required: { value: true, message: 'Gender is a Required Filed' } },
    lookingFor: {
        required: { value: true, message: 'Looking For Category is a Required Filed' },
    },
}

export const interestValidations = {
    interests: {
        required: { value: true, message: 'Interests Category is a Required Filed' },
    },
    ageRange: {
        required: {
            value: true,
            message: 'Age Range is a Required Filed',
        },
    },
    habits: {
        required: {
            value: true,
            message: 'Habits is a Required Filed',
        },
    },
}
