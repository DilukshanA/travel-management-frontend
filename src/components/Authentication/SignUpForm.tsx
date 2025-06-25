"use client"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
//import signupWithEmailPassword from '../../../lib/authentication/signupWithEmailPassword'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../lib/firebaseConfig'
import { useRouter } from 'next/navigation';
import { useSignUpWithEmailPasswordMutation } from '@/redux/reducers/authApiSlice'

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

type FormErrors = {
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  agreedToTerms?: string
}

const validate = (values : FormValues) => {
  const errors : FormErrors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!values.agreedToTerms) {
    errors.agreedToTerms = 'You must agree to the terms and conditions';
  }

  return errors;
}


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
        role: 'user'
      }).unwrap();
      toast.success('User registered successfully!');
      console.log('SignUp Result:', result);  
    } catch (error : any) {
      console.log('Error during signup:', error);
      toast.error(`Signup failed: ${error.data.error || 'An unexpected error occurred'}`, {
        duration: 3000,
        position: 'top-right'
      });
    }
  }

        console.log('isLoading:', isLoading);
      console.log('isSuccess:', isSuccess);
      console.log('isError:', isError);
      console.log('status:', status);
      console.log('error:', error);
      

// const onSubmit = async (values : FormValues) => {


//   //await signupWithEmailPassword(values);

//   try {
//     // call backend signup API
//     const response = await axios.post('http://localhost:4000/api/auth/signup',{
//       firstName: values.firstName,
//       lastName: values.lastName,
//       email: values.email,
//       password: values.password,
//       role: 'user'
//     })
  
//     if (response.status !== 200) {

//       // If the response status is not 200, throw an error
//       toast.error('Failed to sign up', {
//         duration: 3000,
//         position: 'top-right'
//       });
//       throw new Error('Failed to sign up');

//     } else if (response.status === 200) {

//       // If signup API succeeds, log the user in via Firebase Client SDK
//       const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
//       console.log('User logged in:', userCredential.user);
//       toast.success('User registered successfully!');


//       // Store the user data in local storage
//       localStorage.setItem('email', values.email);

//       // Redirect to the OTP verification page
//       router.push('/signup/otp-verification');
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Handle Axios error
//       toast.error(error.response?.data?.message || 'Signup failed', {
//         duration: 3000,
//         position: 'top-right'
//       });
//     } else if (error instanceof Error) {
//       // Handle other errors
//       toast.error(error.message, {
//         duration: 3000,
//         position: 'top-right'
//       });
//     } else {
//       // Handle unexpected errors
//       toast.error('An unexpected error occurred', {
//         duration: 3000,
//         position: 'top-right'
//       });
//     }
//   }
// }

  const formik = useFormik({
  initialValues: initialValues,
  onSubmit: onSubmit,
  validate: validate,
});

//console.log('Formik validation errors: ', formik.errors)
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
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName &&formik.errors.firstName}
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