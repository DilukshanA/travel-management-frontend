"use client"
import SignUpForm from '@/components/Authentication/SignUpForm';
import { Box, Button, Container, Divider, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useSignUpwithGoogleMutation } from '@/redux/reducers/authApiSlice';
import { AuthError, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../lib/firebaseConfig';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../lib/authentication/authExceptions';
import LoadingBackdrop from '@/components/ui/LoadingBackdrop';
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();

  const [ signUp, { isLoading, isSuccess, isError, error } ] = useSignUpwithGoogleMutation();

  const handleGoogleSignUp = async () => {
    try {
      // sign up with google popup firebase auth
      const userCredential = await signInWithPopup(auth, googleProvider)
      // console.log('User signed up with Google:', userCredential.user);

      // get ID token
      const idToken = await userCredential.user.getIdToken();

      const result = await signUp(idToken).unwrap();
      console.log('SignUp Result:', result);
      // Display: User registered successfully! from backend
      toast.success(result.message || 'User signed up with successfully!')

      console.log("New user : ", )

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
    <Container maxWidth="xs">
      {/* Loading backdrop */}
      <LoadingBackdrop open={isSuccess || isLoading} />
        <Paper elevation={10} sx={{ my:8, padding: 2}}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt:2}}>
            <Box 
              component={"img"}
              src="/assets/autonix_logo.png"
              height={50}
            />
            <Typography component={"h1"} variant='h5'
            sx={{fontWeight: 'bold'}}
            >
              Sign Up
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              my: 3
            }}
          >
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

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 3,
            }}
          >
            <Divider sx={{ flex: 1, borderBottomWidth: 2 }}/>
            <Typography sx={{ mx: 2, fontSize: '0.9rem', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1, borderBottomWidth: 2 }}/>
          </Box>

          {/* call the sign up form */}
          <SignUpForm />

            <Divider sx={{ width: '100%', my: 3, borderBottomWidth: 2  }}/>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mb:2
            }}>
              <Typography sx={{ fontSize: '1rem' }}>
                Already have an account?
                <Link
                  href="/login"
                  underline="hover"
                  sx={{
                    ml: 0.5,
                  }}
                >
                  sign in
                </Link>
              </Typography>
            </Box>
        </Paper>
    </Container>
  )
}

export default page