"use client";
import { OTP } from '@/components/ui/OTP'
import { useSignUpOtpResendMutation, useSignUpOtpVerifyMutation } from '@/redux/reducers/otpApiSlice';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get('email');

    const [otp, setOtp] = useState('');

    const [ signUpOtpVerify ] = useSignUpOtpVerifyMutation();
    const [ signUpOtpResend ] = useSignUpOtpResendMutation();

    const handleSubmit = async () => {

      try {
        if(!otp|| otp.length !== 6) {
          toast.error('Please enter a valid 6-digit OTP')
          return;
        }

        const result = await signUpOtpVerify({email, otp}).unwrap();
        toast.success(result.message ||'OTP verified successfully!');
        console.log(result);
        router.push('/');
        
      } catch (error : any) {
        if(error?.originalStatus === 404) {
          toast.error('Server problem occurred !');
        } else {
          toast.error(`${error.data.message || 'An unexpected error occurred'}`)
        }
      }

    }

    const handleSubmit2 = async () => {


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



    const handleSubmitResendOtp = async () => {

      const localStorageData = localStorage.getItem('signUpUserData');
      if (!localStorageData) {
        toast.error("please try again later");
        return;
      }
      const { email, firstName } = JSON.parse(localStorageData);

      console.log(email, firstName);
      try {
        const result = await signUpOtpResend({
          email,
          name: firstName
        }).unwrap();
        console.log(result);
        toast.success('OTP resent successfully!')
      } catch (error) {
        console.error('Error resending OTP:', error);
      }

    }

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
          <Typography variant='body1' sx={{ mb: 4 , textAlign: 'center' }}>
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
            onClick={handleSubmitResendOtp}
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