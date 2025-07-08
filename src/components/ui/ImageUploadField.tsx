import React, { useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface ImageUploadFieldProps {
  id: string;
  value: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}

export default function ImageUploadField({
  id,
  value,
  error,
  onChange,
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    onChange(file);
  };

  return (
    <Box textAlign="center" display='flex' flexDirection='column' alignItems='center'>
      <input
        accept="image/jpeg,image/png"
        id={id}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor={id} style={{ cursor: "pointer" }}>
        <Avatar
          src={preview || ""}
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 1,
          }}
        />
      </label>
      <Box>
        <label htmlFor={id}>
            <IconButton component="span" color="primary">
            <PhotoCamera />
            </IconButton>
        </label>
        <Typography variant="caption">
            JPG or PNG, Recommended size 1:1, Up to 10MB
        </Typography>
        {error && (
            <Typography variant="caption" color="error" display="block">
            {error}
            </Typography>
        )}
      </Box>
    </Box>
  );
}
