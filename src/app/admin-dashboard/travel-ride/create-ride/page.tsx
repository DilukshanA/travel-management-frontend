"use client"
import RideForm from '@/components/create-ride/RideForm'
import LoadingBackdrop from '@/components/ui/LoadingBackdrop'
import { useCreateRideMutation } from '@/redux/reducers/rideApiSlice'
import { Ride } from '@/types/ride'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {

  const [ createRide, { isLoading, isSuccess, isError, error } ] = useCreateRideMutation();
  
  const handleCreateRide = async (trip: Ride) => {
 
  try {
    console.log("Creating ride with trip data:", trip);
    const result = await createRide(trip).unwrap();
    toast.success("Ride created successfully!");
    console.log(result);
  } catch (err : any) {
    if (err?.OriginalStatus === 404) {
      toast.error("Server problem occurred!");
    } else {
      toast.error('An unexpected error occurred !');
    }
  }
}

  return (
    <div>
        this is create ride
        <RideForm onAddTrip={handleCreateRide}/>
        <LoadingBackdrop open={ isLoading} />
    </div>
  )
}

export default page