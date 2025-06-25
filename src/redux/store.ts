import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./reducers/authApiSlice";

const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath] : authApiSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling and other features of RTK Query
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApiSlice.middleware
        );
    }
})

export default store;