"use client"
import AddRoleAndName from '@/components/Authentication/AddRoleAndName'
import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={10} sx={{ my: 8, padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
          <Box
            component={"img"}
            src="/assets/autonix_logo.png"
            height={50}
          />  
          <Typography component={"h1"} variant='h5'
            sx={{ fontWeight: 'bold' }}
          >
            Add your role and name
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
          <AddRoleAndName />
        </Box>
        
      </Paper>
    </Container>
  )
}

export default page