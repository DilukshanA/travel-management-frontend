import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Link, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => {
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
                // color: 'black',
                // borderColor: 'gray',
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

            <Box component="form" sx={{
              mt: 4,
              }}>

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
                    <TextField id='first-name' label="First Name" variant='outlined'
                        size='small'
                    />
                  </Box>
                  <Box>
                    <TextField id='last-name' label="Last Name" variant='outlined'
                        size='small'
                    />
                  </Box>
                </Box>

                <Box>
                  <TextField id='email' label="Email" variant='outlined'
                      size='small'
                      sx={{
                        width: '100%'
                      }}
                  />
                </Box>
                <Box>
                  <TextField id='password' label="Password" variant='outlined'
                      size='small'
                      sx={{
                        width: '100%'
                      }}
                  />
                </Box>
                <Box>
                  <TextField id='confirm-password' label="Confirm Password" variant='outlined'
                      size='small'
                      sx={{
                        width: '100%'
                      }}
                  />
                </Box>
                <FormControlLabel
                  control={<Checkbox />}
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

export default SignUpForm