import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAoiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        credentials: 'include', // Send cookies with the request
    }),
    endpoints: (builder) => ({
        getUserData: builder.query<any, void>({
            // Fetch user data with cookie
            query: () => ({
                url: '/api/get-user-data',
                method: 'GET',
            })
        })
    })
})

export const { useGetUserDataQuery } = userAoiSlice;