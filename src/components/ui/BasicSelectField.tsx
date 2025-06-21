import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type BasicSelectFieldProps = {
  fieldName: string;
  names?: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function BasicSelectField({
  fieldName,
  names = [],
  value: externalValue,
  onChange,
}: BasicSelectFieldProps) {
  const [internalValue, setInternalValue] = React.useState<string>('');

  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    if (externalValue === undefined) {
      setInternalValue(selectedValue);
    }
    onChange?.(selectedValue); // Call the external onChange if provided
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${fieldName}-label`}>{fieldName}</InputLabel>
        <Select
          labelId={`${fieldName}-label`}
          id={`${fieldName}-select`}
          value={value}
          label={fieldName}
          onChange={handleSelectChange}
        >
          {names.map((name, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
