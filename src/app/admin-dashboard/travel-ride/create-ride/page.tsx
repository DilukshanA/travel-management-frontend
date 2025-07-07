"use client"
import RideForm from '@/components/create-ride/RideForm'
import { Ride } from '@/types/ride'
import React, { useState } from 'react'

const page = () => {

  const [trips, setTrips] = useState<Ride[]>([])

  const addTrip = (trip: Ride) => {
  const updatedTrips = [...trips, trip]
  setTrips(updatedTrips)
  localStorage.setItem("travel-trips", JSON.stringify(updatedTrips))
}

  return (
    <div>
        this is create ride
        <RideForm onAddTrip={addTrip}/>
    </div>
  )
}

export default page