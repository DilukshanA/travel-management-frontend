// app/admin-dashboard/layout.tsx
"use client";
import React from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import AppBar from "@/components/admin/AppBar";
import Sidebar, { DrawerHeader, drawerWidth } from "@/components/admin/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} onDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} />
      <Sidebar open={open} onDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, height:'100vh' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
