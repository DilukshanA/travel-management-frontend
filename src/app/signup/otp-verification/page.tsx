"use client";
import { OTP } from '@/components/ui/OTP'
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const router = useRouter();

    const [otp, setOtp] = useState('');

    const handleSubmit = async () => {


      try {
        if (!otp || otp.length !== 6) {
          toast.error('Please enter a valid 6-digit OTP', {
            duration: 3000,
            position: 'top-right'
          });
          return;
        }

        const response = await axios.post('http://localhost:4000/api/auth/signup-otp-verify', {
          email: localStorage.getItem('email'),
          otp: otp
        })

        if (response.status === 200) {
          toast.success('OTP verified successfully!', {
            duration: 3000,
            position: 'top-right'
          });
          localStorage.removeItem('email');
          router.push('/');

        } else if (response.status === 404) {
          toast.error('OTP not found or Expired. Please try again.', {
            duration: 3000,
            position: 'top-right'
          });

        } else {
          toast.error('Failed to verify OTP. Please try again.', {
            duration: 3000,
            position: 'top-right'
          });

        }
      } catch (error) {

        if (axios.isAxiosError(error)) {
          toast.error('Failed to verify OTP. Please try again.', {
            duration: 3000,
            position: 'top-right'
          });

        } else if (error instanceof Error){
          toast.error(error.message, { duration: 3000});
          
        } else {
          toast.error('An unexpected error occurred. Please try again.', {duration: 3000});
        }
      }
    }
    const email = "abc123@gmail.com";

  return (
    <Box className='h-screen flex items-center justify-center'>
      <Box className='px-16 py-8 rounded-2xl flex flex-col items-center
      justify-center bg-white'>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}
        >
          <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 2 }}>
            OTP Verification
          </Typography>
          <Typography variant='body1' sx={{ mb: 4 }}>
            Please enter the OTP sent to {email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />
        </Box>
        <Box 
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 
            , width: '100%'
          }}
        >
          <Button
            variant='text'
            color='primary'
            sx={{ mt: 2 }}
            onClick={() => {
              // Logic to resend OTP
              toast.success('OTP resent successfully!', {
                duration: 3000,
                position: 'top-right'
              });
            }}
          >
            Resend OTP
          </Button>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Verify
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default page