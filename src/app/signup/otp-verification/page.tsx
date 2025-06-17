"use client";
import { OTP } from '@/components/ui/OTP'
import { Box } from '@mui/material';
import React, { useState } from 'react'

const page = () => {

    const [otp, setOtp] = useState('');

  return (
    <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />
        <span>Entered value: {otp}</span>
        </Box>
    </Box>
  )
}

export default page