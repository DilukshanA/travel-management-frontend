import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rideApiSlice = createApi({
    reducerPath : 'rideApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        credentials: 'include', // Send cookies with the request
    }),
    tagTypes: ['Ride'],
    endpoints: (builder) => ({
        createRide : builder.mutation({
            query: (rideData) => ({
                url: '/api/create-ride',
                method: 'POST',
                body: rideData,
            }),
            invalidatesTags: ['Ride']
        })
    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateRideMutation } = rideApiSlice;