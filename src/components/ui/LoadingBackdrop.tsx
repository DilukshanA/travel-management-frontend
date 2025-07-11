import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingBackdropProps {
  open: boolean;
}

const LoadingBackdrop = ({ open }: LoadingBackdropProps) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default LoadingBackdrop;
