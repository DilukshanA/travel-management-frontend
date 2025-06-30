"use client";
import { Box, Button } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { getErrorMessage } from '../../../lib/authentication/authExceptions';
import { AuthError, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '../../../lib/firebaseConfig';
import { useSignUpwithGoogleMutation } from '@/redux/reducers/authApiSlice';
import LoadingBackdrop from '../ui/LoadingBackdrop';

const GooglePopUpSignIn = () => {

    const [ signInWithGoogle, { isLoading, isSuccess, isError, error } ] = useSignUpwithGoogleMutation();

    const router = useRouter();
    

  const handleGoogleSignUp = async () => {
    try {
      // sign up with google popup firebase auth
      const userCredential = await signInWithPopup(auth, googleProvider)
      // console.log('User signed up with Google:', userCredential.user);

      // get ID token
      const idToken = await userCredential.user.getIdToken();

      const result = await signInWithGoogle(idToken).unwrap();
      console.log('SignUp Result:', result);
      // Display: User registered successfully! from backend
      toast.success(result.isNewUser ? `${result.name}! Welcome to Autonix!` : `Welcome back ${result.name}!`);

      // navigate to add role and name page
      setTimeout(() => {
        // if new user navigate to add role and name page , if not new user navigate to home page
        router.push(`${result.isNewUser ? '/signup/add-your-role' : '/'}`)
        // router.push('/signup/add-your-role');
      }, 1000);

    } catch (err: any) {
      // when server is not running or connection refused
      if (err?.originalStatus === 404) {
        toast.error("Server problem occurred !")
      } 
      // Internal Server Error
      else if (err?.originalStatus === 500) {
        toast.error("Internal server error !")
      } 
      // firebase auth error handling
      else if (err as AuthError) {
        const authError = err as AuthError;
        const errorMessage = getErrorMessage(authError.code);
        toast.error(`error : ${errorMessage}`)
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center',
        alignItems: 'center', width: '100%', my: 3 }}
    >
    <LoadingBackdrop open={isSuccess || isLoading} />
    <Button
        variant='outlined'
        startIcon={<FcGoogle />}
        color="inherit"
        sx={{
        width: '100%',
        }}
        onClick={handleGoogleSignUp}
    >
        Continue with Google
    </Button>
    </Box>
  )
}

export default GooglePopUpSignIn