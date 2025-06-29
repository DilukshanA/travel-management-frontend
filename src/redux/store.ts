import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./reducers/authApiSlice";
import { otpApiSlice } from "./reducers/otpApiSlice";

const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath] : authApiSlice.reducer,
        [otpApiSlice.reducerPath] : otpApiSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling and other features of RTK Query
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApiSlice.middleware,
            otpApiSlice.middleware,
        );
    }
})

export default store;