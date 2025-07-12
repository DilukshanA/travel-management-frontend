import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vehicelApiSlice = createApi({
    reducerPath: 'vehicleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        credentials: 'include', // Send cookies with the request
    }),
    tagTypes: ['Vehicle'],
    endpoints: (builder) => ({
        addVehicle: builder.mutation({
            query: (vehicleData) => ({
                url: '/api/add-vehicle',
                method: 'POST',
                body: vehicleData,
            }),
            invalidatesTags: ['Vehicle']
        }),
        getAllVehicles: builder.query({
            query: () => ({
                url: '/api/all-vehicles',
                method: 'GET',
            }),
            providesTags: ['Vehicle'],
        })
    })
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { 
    useAddVehicleMutation,
    useGetAllVehiclesQuery
 } = vehicelApiSlice;