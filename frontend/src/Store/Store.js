import { configureStore } from '@reduxjs/toolkit'

import userDetailsReducer from './features/UserDetails/UserDetailsSlice'

export const store = configureStore({
    reducer: {
        userDetails: userDetailsReducer,
    },
})
