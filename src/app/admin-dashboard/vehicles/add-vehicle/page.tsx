import CompanyForm from '@/components/CompanyForm'
import AddVehicleForm from '@/components/vehicle/AddVehicleForm'
import React from 'react'

const page = () => {
  return (
    <div>
        <AddVehicleForm/>
        <CompanyForm/>
    </div>
  )
}

export default page