import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formDetails: {},
}

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        stepFormFunc: (state, action) => {
            state.formDetails = {
                ...state.formDetails,
                ...action.payload,
            }
        },
    },
})

export const { stepFormFunc } = userDetailsSlice.actions

export default userDetailsSlice.reducer
