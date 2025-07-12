"use client" 
import StickyTable, { Column } from '@/components/ui/StickyTable'
import { VehicleTypes } from '@/types/vehicle';
import Image from 'next/image';
import React from 'react'

const createVehicleData = (
  {
    vehicleName,
    vehicleType,
    vehicleNumber,
    ownerName,
    ownerPhone,
    vehiclePhoto,
    status,
    totalSeats
  } : VehicleTypes
) => {
  return { vehicleName, vehicleType, vehicleNumber,
    ownerName, ownerPhone, vehiclePhoto, status, totalSeats }
}

const vehicleRows: VehicleTypes[] = [
  createVehicleData({
    vehicleName: 'Bus',
    vehicleType: 'Public Transport',
    vehicleNumber: 'AB123CD',
    ownerName: 'John Doe',
    ownerPhone: '1234567890',
    vehiclePhoto: 'https://res.cloudinary.com/dbcawcvu6/image/upload/v1752247112/vehuname_Bus_1752247110437.jpg',
    status: 'Active',
    totalSeats: 50
  }),
  // ... more vehicle rows
]

const vehicleColumns: readonly Column<VehicleTypes>[] = [
  {
    id: 'vehiclePhoto',
    label: 'Vehicle Photo',
    minWidth: 100,
    align: 'center',
    renderCell: (value) => {
      if (typeof value === 'string' && value.startsWith('http')) {
        return (
          <Image
            src={value}
            alt="vehicle"
            width={60}
            height={25}
            style={{ objectFit: 'cover', borderRadius: 4 }}
          />
        );
      }
      return <span style={{ color: 'gray' }}>No Image</span>;
    },
  },
  { id: 'vehicleName', label: 'Vehicle Name', minWidth: 120 },
  { id: 'vehicleType', label: 'Vehicle Type', minWidth: 100 },
  { id: 'vehicleNumber', label: 'Vehicle Number', minWidth: 100 },
  { id: 'totalSeats', label: 'Total Seats', minWidth: 100, },
  { id: 'ownerName', label: 'Owner Name', minWidth: 100 },
  { id: 'ownerPhone', label: 'Owner Phone', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
]

const page = () => {
  return (
    <div>
      <StickyTable columns={vehicleColumns} rows={vehicleRows} />
    </div>
  )
}

export default page