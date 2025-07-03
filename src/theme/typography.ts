import { TypographyVariantsOptions } from "@mui/material/styles";

export const typography: TypographyVariantsOptions = {
  fontFamily: [
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
  h1: {
    fontWeight: 700,
    fontSize: "2.5rem",
  },
  h2: {
    fontWeight: 600,
    fontSize: "2rem",
  },
  body1: {
    fontSize: "1rem",
  },
  button: {
    textTransform: "none",
    fontWeight: 600,
  },
};
