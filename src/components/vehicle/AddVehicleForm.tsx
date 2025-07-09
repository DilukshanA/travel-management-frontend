"use client"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import ImageUploadField from '../ui/ImageUploadField'

const AddVehicleForm = () => {
    const [ vehicleImage, setVehicleImage ] = React.useState<File | null>(null);
  return (
    <Box component='form' sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Box>
            <ImageUploadField
                id='vehicle-logo'
                value={vehicleImage}
                onChange={(file) => setVehicleImage(file)}
            />
        </Box>
        <Box display='flex' gap={2}>
            <TextField
                label="Vehicle Name"
                placeholder='Enter vehicle name'
                variant="outlined"
                fullWidth
            />
            <FormControl fullWidth>
            <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
            <Select
                labelId="vehicle-type-label"
                id="vehicle-type"
                label="Vehicle Type"
            >
                <MenuItem>Bus</MenuItem>
                <MenuItem>Van</MenuItem>
                <MenuItem>Car</MenuItem>
                <MenuItem>Truck</MenuItem>
            </Select>
            </FormControl>
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <TextField
                label="Vehicle Number"
                placeholder='Enter vehicle number'
                variant="outlined"
                fullWidth
            />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
            >
                <MenuItem>Active</MenuItem>
                <MenuItem>Inactive</MenuItem>
            </Select>
            </FormControl>
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <TextField
                label="Owner Name"
                placeholder='Enter owner name'
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Total Seats"
                type="number"
                placeholder='Enter total seats'
                variant="outlined"
                fullWidth
            />
        </Box>
        <Box display='flex' gap={2} mt={2}>
            {/* phone number */}
            <TextField
                label="Owner Phone"
                type="tel"
                placeholder='Enter owner phone number'
                variant="outlined"
                fullWidth
            />
        </Box>
        <Button
            variant="contained"
            size='large'
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            disableElevation
        >Add Vehicle
        </Button>
    </Box>
  )
}

export default AddVehicleForm