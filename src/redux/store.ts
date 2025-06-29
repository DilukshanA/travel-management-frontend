import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./reducers/authApiSlice";
import { otpApiSlice } from "./reducers/otpApiSlice";
import { userSlice } from "./reducers/userSlice";

const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
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

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store