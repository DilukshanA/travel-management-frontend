"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface FormValues {
  companyName: string;
  industryType: string;
  city: string;
  logo: File | null;
}

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
];

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  industryType: Yup.string().required("Industry Type is required"),
  city: Yup.string().required("City is required"),
  logo: Yup.mixed<File>()
    .nullable()
    .test("fileSize", "File too large (max 10MB)", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 10 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true;
      return (
        value instanceof File &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});

export default function CompanyForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      companyName: "",
      industryType: "",
      city: "",
      logo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Company Logo
      </Typography>
      <Box textAlign="center" mb={2}>
        {/* Wrap the Avatar in label */}
        <label htmlFor="upload-logo" 
        style={{ 
            cursor: "pointer",
            display: "flex",
          
        }}>
          <Avatar
            src={logoPreview || ""}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 1,
            }}
          />
        </label>
        <input
          accept="image/jpeg,image/png"
          id="upload-logo"
          type="file"
          style={{ display: "none" }}
          onChange={handleLogoChange}
        />
        <label htmlFor="upload-logo">
          <IconButton component="span" color="primary">
            <PhotoCamera />
          </IconButton>
        </label>
        <Typography variant="caption">
          JPG or PNG, Recommended size 1:1, Up to 10MB
        </Typography>
        {formik.errors.logo && (
          <Typography variant="caption" color="error">
            {formik.errors.logo}
          </Typography>
        )}
      </Box>

      <Typography variant="h6" mb={1}>
        Company Details
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={
            formik.touched.companyName && formik.errors.companyName
          }
        />

        <TextField
          select
          fullWidth
          id="industryType"
          name="industryType"
          label="Industry Type"
          value={formik.values.industryType}
          onChange={formik.handleChange}
          error={
            formik.touched.industryType && Boolean(formik.errors.industryType)
          }
          helperText={
            formik.touched.industryType && formik.errors.industryType
          }
        >
          {industryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
