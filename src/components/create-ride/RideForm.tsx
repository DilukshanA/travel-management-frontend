import { Box, Button, IconButton, TextField } from '@mui/material'
import React from 'react'
import LocationPinIcon from '@mui/icons-material/LocationPin';

const RideForm = () => {
  return (
    <div>
        <Box component='form' sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            minHeight: '100vh',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 600,
            }}>
            <TextField id='ride-name' label='Ride Name' variant='outlined'
                size='medium' name='ride-name'
            />
            <Box display='flex' sx={{gap: 2}}>
                <TextField id='start-location' label='Start Location' variant='outlined'
                    size='medium' name='start-location' fullWidth
                />
                <IconButton aria-label='start-location' size='large'>
                    < LocationPinIcon/>
                </IconButton>
            </Box>
            <Box  display='flex' sx={{gap: 2}}>
                <TextField id='end-location' label='End Location' variant='outlined'
                    size='medium' name='end-location' fullWidth
                />
                <IconButton aria-label='start-location' size='large'>
                    < LocationPinIcon/>
                </IconButton>
            </Box>
            <TextField id='distance' label='Distance in KM' variant='outlined' 
                size='medium' name='distance'
            />
            </Box>
            <Button variant='contained' disableElevation size='large' sx={{mt: 4}}
            >
                Create Ride
            </Button>
        </Box>
    </div>
  )
}

export default RideForm