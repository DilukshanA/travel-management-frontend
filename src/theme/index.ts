import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';

// You can also import shadows, shape, spacing, etc.

export const getTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    // You could add shape, shadows, spacing here
  };

  return createTheme(themeOptions);
};
