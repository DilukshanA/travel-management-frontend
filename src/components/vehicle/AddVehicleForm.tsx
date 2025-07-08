"use client"
import { Box, TextField } from '@mui/material'
import React from 'react'
import BasicSelectField from '../ui/BasicSelectField'

const AddVehicleForm = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Box display='flex' gap={2}>
            <TextField
                label="Vehicle Name"
                placeholder='Enter vehicle name'
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Vehicle Type"
                placeholder='Enter vehicle type'
                variant="outlined"
                fullWidth
            />
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <TextField
                label="Vehicle Number"
                placeholder='Enter vehicle number'
                variant="outlined"
                fullWidth
            />
            <BasicSelectField
                name="vehicleStatus"
                fieldName="Vehicle Status"
                names={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                ]}
                value="active"
                onChange={(value) => console.log(value)}
            />
        </Box>
    </Box>
  )
}

export default AddVehicleForm