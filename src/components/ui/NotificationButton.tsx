import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const NotificationButton = () => {
  return (
    <Tooltip title="Notifications" arrow>
        <IconButton>
            <NotificationsNoneIcon />
        </IconButton>
    </Tooltip>
  )
}

export default NotificationButton