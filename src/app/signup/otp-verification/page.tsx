"use client";
import { OTP } from '@/components/ui/OTP'
import { Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

const page = () => {

    const [otp, setOtp] = useState('');

    const handleSubmit = async () => {

        const response = await axios.post('http://localhost:4000/api/auth/signup-otp-verify', {
          email: localStorage.getItem('email'),
          otp: otp
        })
    }

  return (
    <Box className='h-screen flex items-center justify-center'>
      <Box className='px-16 py-8 rounded-2xl flex flex-col items-center
      justify-center bg-white'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />
        </Box>
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default page