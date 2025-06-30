"use client"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import TextButton from '../ui/TextButton'
import { useFormik } from 'formik'
import { signInValidate } from '@/forms/login/validation'
import { signInInitialValues } from '@/forms/login/initialValues'
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../lib/firebaseConfig'
import { useLoginWithEmailPasswordMutation } from '@/redux/reducers/authApiSlice'
import LoadingBackdrop from '../ui/LoadingBackdrop'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getErrorMessage } from '../../../lib/authentication/authExceptions'

const LoginForm = () => {

  const [ loginWithEmailPassword, { isLoading, isSuccess, isError, error } ] = useLoginWithEmailPasswordMutation();

  const router = useRouter();

  const handleLogin = async () => {

    try {
      if (!formik.values.email || !formik.values.password) {
        throw new Error('Email and password are required.');
      }
      const userCredential = await signInWithEmailAndPassword(auth, formik.values.email, formik.values.password );
      console.log('User logged in successfully:', userCredential.user);

      // get ID token
      const idToken = await userCredential.user.getIdToken();

      const result = await loginWithEmailPassword(idToken).unwrap();
      console.log('Login Result:', result);
      toast.success("Hi, " + result.user.firstName + "! You have logged in successfully.");

    } catch (err : any) {
      // when server is not running or connection refused
      if (err?.originalStatus === 404) {
        toast.error('Server problem occurred !')
      }
      // Internal Server Error
      else if (err?.originalStatus === 500) {
        toast.error('Internal server error !')
      }
      // firebase auth error handling
      else if (err as AuthError) {
        const authError = err as AuthError;
        const errorMessage = getErrorMessage(authError.code);
        toast.error(errorMessage);
      }
    }
  }

  const formik = useFormik({
    initialValues: signInInitialValues,
    onSubmit: handleLogin,
    validate: signInValidate
  })
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{
      mt: 4,
      }}>
        <LoadingBackdrop open={isLoading || isSuccess} />

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>

        <Box>
          <TextField id='email' label="Email" variant='outlined'
              size='small' sx={{ width: '100%'}}
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box>
          <TextField id='password' label="Password" variant='outlined'
              size='small' fullWidth type='password'
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <FormControlLabel
              control={<Checkbox />}
              label={
                  <Typography
                  sx={{ fontSize: '1rem' }}
                  >
                  Remember me
                  </Typography>
              }
              name='rememberMe'
              onChange={formik.handleChange}
              value={formik.values.rememberMe}
            />
            <Box>
                <TextButton text="Forgot password?" />
            </Box>
        </Box>
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
        Login
      </Button>
    </Box>
  )
}

export default LoginForm