"use client"
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import ImageUploadField from '../ui/ImageUploadField'
import Image from 'next/image'
import { useFormik } from 'formik'
import { addVehicleInitialValues } from '@/forms/vehicle/initialValues'
import { vehicleValidationSchema } from '@/forms/vehicle/validation'

const AddVehicleForm = () => {
    const [ vehicleImage, setVehicleImage ] = React.useState<File | null>(null);

    const formik = useFormik({
        initialValues: addVehicleInitialValues,
        validationSchema: vehicleValidationSchema,
        onSubmit: (values) => {
            console.log("values : " , values);
        }
    })

  return (
    <Box component='form' onSubmit={formik.handleSubmit} sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
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
                name='vehicleName'
                value={formik.values.vehicleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vehicleName && Boolean(formik.errors.vehicleName)}
                helperText={formik.touched.vehicleName && formik.errors.vehicleName}
            />
            <FormControl fullWidth>
            <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
            <Select
                labelId="vehicle-type-label"
                id="vehicle-type"
                label="Vehicle Type"
                name='vehicleType'
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
                //helperText={formik.touched.vehicleType && formik.errors.vehicleType}
            >
                <MenuItem value="Bus">Bus</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
            </Select>
            </FormControl>
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <TextField
                label="Vehicle Number"
                placeholder='Enter vehicle number'
                variant="outlined"
                fullWidth
                name='vehicleNumber'
                value={formik.values.vehicleNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vehicleNumber && Boolean(formik.errors.vehicleNumber)}
                helperText={formik.touched.vehicleNumber && formik.errors.vehicleNumber}
            />
            <TextField
                label="Total Seats"
                type="number"
                placeholder='Enter total seats'
                variant="outlined"
                fullWidth
                name='totalSeats'
                value={formik.values.totalSeats}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.totalSeats && Boolean(formik.errors.totalSeats)}
                helperText={formik.touched.totalSeats && formik.errors.totalSeats}
            />
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <TextField
                label="Owner Name"
                placeholder='Enter owner name'
                variant="outlined"
                fullWidth
                name='ownerName'
                value={formik.values.ownerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
                helperText={formik.touched.ownerName && formik.errors.ownerName}
            />
            <TextField
                label="Owner Phone Number"
                id="owner-phone"
                fullWidth
                placeholder='Enter owner phone number'
                name='ownerPhone'
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
                value={formik.values.ownerPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ownerPhone && Boolean(formik.errors.ownerPhone)}
                helperText={formik.touched.ownerPhone && formik.errors.ownerPhone}
            />
        </Box>
        <Box display='flex' gap={2} mt={2}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                name='status'
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
            >
                <MenuItem value="Availabl">Available</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
            </Select>
            </FormControl>
        </Box>
        <Button
            type="submit"
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