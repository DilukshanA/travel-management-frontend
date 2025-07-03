import { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
  },
  secondary: {
    main: '#9c27b0',
    contrastText: '#fff',
  },
  background: {
    default: '#f4f6f8',
    paper: '#fff',
  },
  text: {
    primary: '#212121',
    secondary: '#424242',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#90caf9',
  },
  secondary: {
    main: '#ce93d8',
  },
  background: {
    default: '#121212',
    paper: '#1d1d1d',
  },
  text: {
    primary: '#ffffff',
    secondary: '#bdbdbd',
  },
};
