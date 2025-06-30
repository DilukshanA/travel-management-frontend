"use client"
import SignUpForm from '@/components/Authentication/SignUpForm';
import { Box, Container, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation';
import TextButton from '@/components/ui/TextButton';
import GooglePopUpSignIn from '@/components/Authentication/GooglePopUpSignIn';

const page = () => {

  const router = useRouter();

  return (
    <Container maxWidth="xs">
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

          {/* continue with google */}
          <GooglePopUpSignIn/>

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
              <Typography sx={{ fontSize: '1rem' , display:'flex' , alignItems: 'center' }}>
                Already have an account?
                <TextButton
                  onClick={() => router.push('/login')}
                  text="Login"
                />
              </Typography>
            </Box>
        </Paper>
    </Container>
  )
}

export default page