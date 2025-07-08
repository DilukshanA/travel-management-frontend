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
                url: '/api/create-ride1',
                method: 'POST',
                body: rideData,
            }),
            invalidatesTags: ['Ride']
        }),
        getAllRides: builder.query({
            query: () => ({
                url: '/api/get-all-rides',
                method: 'GET',
            }),
            providesTags: ['Ride'],
        }),
        getRideById: builder.query({
            query: (rideId) => ({
                url: `/api/get-ride/${rideId}`,
                method: 'GET',
            }),
            providesTags: (result, error, rideId) => result
                ? [{ type: 'Ride', id: result.id }]
                : [],
        })
    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { 
    useCreateRideMutation,
    useGetAllRidesQuery,
    useGetRideByIdQuery,
} = rideApiSlice;