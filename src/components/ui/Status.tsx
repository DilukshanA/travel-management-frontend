import { Box } from '@mui/material';
import React from 'react'

type StatusProps = {
    value: string;
    bgcolor?: string;
    textColor?: string;
}

const Status = (
    { value, bgcolor, textColor } : StatusProps
) => {
  return (
    <Box sx={{ bgcolor: bgcolor, color: textColor,
        borderRadius: 2, fontWeight: 'bold' }}
    >
        {value}
    </Box>
  )
}

export default Status