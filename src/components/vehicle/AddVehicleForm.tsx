"use client"
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import ImageUploadField from '../ui/ImageUploadField'
import Image from 'next/image'
import { useFormik } from 'formik'
import { addVehicleInitialValues } from '@/forms/vehicle/initialValues'
import { vehicleValidationSchema } from '@/forms/vehicle/validation'

const AddVehicleForm = () => {
    const [ vehicleImage, setVehicleImage ] = useState<File | null>(null);
    const CLOUDINARY_UPLOAD_VEHICLE_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_VEHICLE_PRESET;
    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDNAME;
    
    const onSubmit = async () => {
        try {
            let uploadedImageUrl = "";

            if (vehicleImage) {
                const formData = new FormData();
                formData.append('file', vehicleImage);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_VEHICLE_PRESET ?? "autonix_vehicle_preset");
                formData.append('public_id', `${formik.values.vehicleName}_${formik.values.vehicleType}_${Date.now()}`); // Optional: Set a public ID for the image}`)

                const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                })
                if (!cloudinaryRes.ok) {
                    throw new Error('Failed to upload image to Cloudinary');
                }
                const cloudinaryData = await cloudinaryRes.json();
                uploadedImageUrl = cloudinaryData.secure_url; // Get the secure URL of the uploaded image
            }
            
        } catch (error) {
            console.log("Error uploading vehicle data:", error);
        }
    }

    const formik = useFormik({
        initialValues: addVehicleInitialValues,
        validationSchema: vehicleValidationSchema,
        onSubmit: onSubmit,
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