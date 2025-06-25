import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
    }),
    endpoints: (builder) => ({
        signUpWithEmailPassword: builder.mutation({
            query: (userData) => ({
                url: "/api/auth/signup",
                method: "POST",
                body: userData
            })
        }),
        signUpwithGoogle: builder.mutation({
            query: (idToken) => ({
                url: "/api/auth/signup-with-google",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { 
    useSignUpWithEmailPasswordMutation,
    useSignUpwithGoogleMutation
} = authApiSlice;