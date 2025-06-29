import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

type Option = {
  label: string;
  value: string;
};

type BasicSelectFieldProps = {
  name: string;
  fieldName: string;
  names?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
};

export default function BasicSelectField({
  name,
  fieldName,
  names = [],
  value: externalValue,
  onChange,
  onBlur = () => {},
  error,
  helperText
}: BasicSelectFieldProps) {
  const [internalValue, setInternalValue] = React.useState<string>('');

  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    if (externalValue === undefined) {
      setInternalValue(selectedValue);
    }
    onChange?.(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={`${fieldName}-label`}>{fieldName}</InputLabel>
        <Select
          labelId={`${fieldName}-label`}
          id={`${fieldName}-select`}
          name={name}
          value={value}
          label={fieldName}
          onChange={handleSelectChange}
          onBlur={onBlur}
        >
          {names.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
