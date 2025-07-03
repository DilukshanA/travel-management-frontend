// components/MiniDrawer.tsx
"use client";
import * as React from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import AppBar from './../../components/admin/AppBar';
import Sidebar, { DrawerHeader, drawerWidth } from './../../components/admin/Sidebar';

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} onDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} />
      <Sidebar open={open} onDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod...
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est...
        </Typography>
      </Box>
    </Box>
  );
}
