import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import React from 'react'


const SignUpForm = () => {
  return (
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
  )
}

export default SignUpForm