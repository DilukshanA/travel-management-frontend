import { Button } from '@mui/material'
import React from 'react'

type TextButtonProps = {
    onClick?: () => void;
    text?: string;
    
}

const TextButton = (
    { onClick, text } : TextButtonProps
) => {
  return (
    <Button
        onClick={onClick}
        variant='text'
        size='small'
        disableElevation
        disableRipple
        sx={{
        textTransform: 'none',
        fontSize: '1rem',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            textDecorationThickness: '1.5px',
        },
        boxShadow: 'none',
        padding: 0,
        margin: 0
        }}
    >
        {text}
    </Button>
  )
}

export default TextButton