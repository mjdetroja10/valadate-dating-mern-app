const { createSlice } = require('@reduxjs/toolkit')

const userDetailsReducer = createSlice({
    name: 'userDetails',
    initialState: { user: null },
    reducers: {
        addUser: (state, action) => {
            return { ...state, user: action.payload }
        },
        removeUser: (state) => {
            return { ...state, user: null }
        },
    },
})

export const { addUser, removeUser } = userDetailsReducer.actions

export default userDetailsReducer.reducer
