import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  return (
    <Tooltip title="Logout" arrow>
    {/* <IconButton onClick={() => setLoading(true)} loading={loading}></IconButton> */}
        <IconButton>
            <LogoutIcon/>
        </IconButton>
    </Tooltip>
  )
}

export default Logout