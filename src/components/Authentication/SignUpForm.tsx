"use client"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const initialValues : FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false
}

const onSubmit = (values : FormValues) => {
  console.log('Form values:', values);
  // Here you can handle the form submission, e.g., send data to your backend
}

const SignUpForm = () => {


  const formik = useFormik({
  initialValues: initialValues,
  onSubmit: onSubmit,
});

  return (
    <Box component="form" sx={{
      mt: 4,
      }}
      onSubmit={formik.handleSubmit}
    >

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
            />
          </Box>
          <Box>
            <TextField id='lastName' label="Last Name" variant='outlined'
                name='lastName' size='small'
                onChange={formik.handleChange}
                value={formik.values.lastName}
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
          />
        </Box>
        <FormControlLabel
          control={<Checkbox 
            id='agreedToTerms'
            name='agreedToTerms'
            checked={formik.values.agreedToTerms}
            color='primary'
            onChange={formik.handleChange}
          />}
          label={
            <Typography
              sx={{ fontSize: '1rem' }}
            >
              I agree to the terms and conditions
            </Typography>
          }
        />
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