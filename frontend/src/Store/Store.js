import { configureStore } from '@reduxjs/toolkit'
import UserDetailsReducer from './reducers/UserDetailsReducer'

export const store = configureStore({
    reducer: {
        userDetails: UserDetailsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
