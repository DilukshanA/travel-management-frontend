"use client";
import IconButton from "@mui/material/IconButton";
import { useColorMode } from "@/theme/ThemeContext";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from '@mui/icons-material/LightMode';
import ContrastIcon from '@mui/icons-material/Contrast';

export default function ThemeToggle() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <ContrastIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
