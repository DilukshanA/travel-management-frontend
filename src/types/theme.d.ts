import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customBg: {
      default: string;
    };
  }

  interface PaletteOptions {
    customBg?: {
      default: string;
    };
  }
}
