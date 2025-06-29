"use client"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSignUpWithEmailPasswordMutation } from '@/redux/reducers/authApiSlice'
import { signUpValidate } from '@/forms/signup/validation'
import { signUpInitialValues } from '@/forms/signup/initialValues'
import toast from 'react-hot-toast';
import LoadingBackdrop from '../ui/LoadingBackdrop';


const SignUpForm = () => {

  const router = useRouter();

  // use useSignUpWithEmailPasswordMutation for signup
  const [ signUp, { isLoading, isSuccess, isError, status, error } ] = useSignUpWithEmailPasswordMutation();

  const onSubmit = async () => {
    try {
      const result = await signUp({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
        role: 'Passenger'
      }).unwrap();
      toast.success(result.message || 'User registered successfully!');

      // Store email and firstname with 2-hour expiry
      localStorage.setItem('signUpUserData', JSON.stringify({
        email: formik.values.email,
        firstName: formik.values.firstName,
        expiry: Date.now() + 2 * 60 * 60 * 1000 // 2 hours in milliseconds
      }))
      
      // navigate to otp page
      setTimeout(() => {
        router.push(`/signup/otp-verification?email=${encodeURIComponent(formik.values.email)}`)
      }, 1000);
    } catch (error : any) {

      if(error?.originalStatus === 404) {
        toast.error('Server problem occurred !');
      } else {
        toast.error(`Signup failed: ${error.data.message || 'An unexpected error occurred'}`)
      }
    }
  }   

  const formik = useFormik({
  initialValues: signUpInitialValues,
  onSubmit: onSubmit,
  validate: signUpValidate,
});

  return (
    <Box component="form" sx={{
      mt: 4,
      }}
      onSubmit={formik.handleSubmit}
    >
      <LoadingBackdrop open={isLoading || isSuccess} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <Box sx={{
          display: 'flex',
          gap: 2
        }}>
          <Box>
            <TextField id='firstName' label="First Name" variant='outlined'
                name='firstName' size='small'
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Box>
          <Box>
            <TextField id='lastName' label="Last Name" variant='outlined'
                name='lastName' size='small'
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Box>
        </Box>

        <Box>
          <TextField id='email' label="Email" variant='outlined'
              name='email' size='small'
              sx={{
                width: '100%'
              }}
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box>
          <TextField id='password' label="Password" variant='outlined'
              name='password' size='small'
              sx={{
                width: '100%'
              }}
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Box>
          <TextField id='confirmPassword' label="Confirm Password" variant='outlined'
              name='confirmPassword' size='small'
              sx={{
                width: '100%'
              }}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Box>
        <FormControlLabel
          control={<Checkbox 
            id='agreedToTerms'
            name='agreedToTerms'
            checked={formik.values.agreedToTerms}
            color='primary'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />}
          label={
            <Typography
              sx={{ fontSize: '1rem' }}
            >
              I agree to the terms and conditions
            </Typography>
          }
        />
        {formik.touched.agreedToTerms && formik.errors.agreedToTerms && (
          <Typography variant="caption" color="error" sx={{ ml: 1 }}>
            {formik.errors.agreedToTerms}
          </Typography>
      )}
      </Box>

      <Button
        type='submit'
        variant='contained'
        disableElevation
        sx={{
          marginTop: 3,
          width: '100%',
          height: 50
        }}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default SignUpForm