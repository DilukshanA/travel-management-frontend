import { Box, Button, Checkbox, Container, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

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
            <Box component="form" sx={{
              mt: 4,
              mb: 2,
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
                  required
                  control={<Checkbox />}
                  label="I agree to the Terms and Conditions"
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
        </Paper>
    </Container>
  )
}

export default SignUpForm