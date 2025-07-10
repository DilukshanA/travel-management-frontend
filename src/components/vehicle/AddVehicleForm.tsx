"use client"
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import ImageUploadField from '../ui/ImageUploadField'
import Image from 'next/image'
import { useFormik } from 'formik'
import { addVehicleInitialValues } from '@/forms/vehicle/initialValues'

const AddVehicleForm = () => {
    const [ vehicleImage, setVehicleImage ] = React.useState<File | null>(null);

    const formik = useFormik({
        initialValues: addVehicleInitialValues,
        validationSchema: {},
        onSubmit: (values) => {}
    })

  return (
    <Box component='form' sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Box sx={{ mb:2}}>
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
            <TextField
                label="Total Seats"
                type="number"
                placeholder='Enter total seats'
                variant="outlined"
                fullWidth
            />
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <TextField
                label="Owner Name"
                placeholder='Enter owner name'
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Owner Phone Number"
                id="owner-phone"
                fullWidth
                slotProps={{
                    input: {
                    startAdornment: <InputAdornment position="start">
                        <Image
                        src="/assets/sri_lanka_flag.png"
                        alt="Sri Lanka Flag"
                        width={42}
                        height={24}
                        />
                    </InputAdornment>,
                    },
                }}
            />
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
            >
                <MenuItem>Available</MenuItem>
                <MenuItem>Unavailable</MenuItem>
                <MenuItem>Maintenance</MenuItem>
            </Select>
            </FormControl>
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