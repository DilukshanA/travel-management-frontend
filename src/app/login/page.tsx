"use client";
import GooglePopUpSignIn from '@/components/Authentication/GooglePopUpSignIn';
import LoginForm from '@/components/Authentication/LoginForm';
import TextButton from '@/components/ui/TextButton';
import { Box, Button, Container, Divider, Link, Paper, Typography } from '@mui/material'
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FcGoogle } from "react-icons/fc";

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
              Welcome back
            </Typography>
          </Box>
          
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

          {/* call the login form */}
          <LoginForm/>

            <Divider sx={{ width: '100%', my: 3, borderBottomWidth: 2  }}/>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mb:2
            }}>
              <Typography sx={{ fontSize: '1rem' , display:'flex' , alignItems: 'center' }}>
                Don't have an account?
                <TextButton
                  onClick={() => router.push('/signup')}
                  text="sign up"
                />
              </Typography>
            </Box>
        </Paper>
    </Container>
  )
}

export default page