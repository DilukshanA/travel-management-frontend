import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApiSlice = createApi({
    reducerPath : "otpApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        signUpOtpVerify: builder.mutation({
            query: ({ email, otp }) => ({
                url: "/api/auth/signup-otp-verify",
                method: "POST",
                body: { email, otp }
            })
        }),
        signUpOtpResend: builder.mutation({
            query: ({ email, name }) => ({
                url: "/api/auth/signup-resend-otp",
                method: "POST",
                body: { email, name }
            })
        })
    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { 
    useSignUpOtpVerifyMutation,
    useSignUpOtpResendMutation
} = otpApiSlice;