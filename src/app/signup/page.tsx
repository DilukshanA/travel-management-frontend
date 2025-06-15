import SignUpForm from '@/components/Authentication/SignUpForm';
import { Box, Button, Container, Divider, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import { FcGoogle } from "react-icons/fc";

const page = () => {
  return (
    <Container maxWidth="xs">
        <Paper elevation={10} sx={{ marginTop:8, padding: 2}}>
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
                  href="/signin"
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