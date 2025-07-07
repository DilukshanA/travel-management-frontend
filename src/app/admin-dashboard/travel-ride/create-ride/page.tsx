"use client"
import RideForm from '@/components/create-ride/RideForm'
import LoadingBackdrop from '@/components/ui/LoadingBackdrop'
import { useCreateRideMutation } from '@/redux/reducers/rideApiSlice'
import { Ride } from '@/types/ride'
import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {

  // const [trips, setTrips] = useState<Ride[]>([])

  const [ createRide, { isLoading, isSuccess, isError, error } ] = useCreateRideMutation();

  const handleCreateRide = async (trip: Ride) => {
  // const updatedTrips = [...trips, trip]
  // setTrips(updatedTrips)
  // localStorage.setItem("travel-trips", JSON.stringify(updatedTrips))
  try {
    console.log("Creating ride with trip data:", trip);
    const result = await createRide(trip).unwrap();
    toast.success("Ride created successfully!");
    console.log(result);
  } catch (error) {
    console.log("Error creating ride:", error);
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