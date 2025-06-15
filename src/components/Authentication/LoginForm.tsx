import { Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@mui/material'
import React from 'react'

const LoginForm = () => {
  return (
    <Box component="form" sx={{
      mt: 4,
      }}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>

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
              size='small' fullWidth type='password'
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
            />
            <Box>
                <Link href="/forgot-password" variant="body2" underline="hover">
                    Forgot password?
                </Link>
                
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