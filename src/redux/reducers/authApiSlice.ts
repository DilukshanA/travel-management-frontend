import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        credentials: "include", // Send cookies with the request
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        signUpWithEmailPassword: builder.mutation({
            query: (userData) => ({
                url: "/api/auth/signup",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        }),
        signUpwithGoogle: builder.mutation({
            query: (idToken) => ({
                url: "/api/auth/signup-with-google",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Auth"]
        }),
        getUserData: builder.query<any, void>({
            // Fetch user data with cookie
            query: () => ({
                url: '/api/get-user-data',
                method: 'GET',
            })
        })
    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { 
    useSignUpWithEmailPasswordMutation,
    useSignUpwithGoogleMutation,
    useGetUserDataQuery
} = authApiSlice;