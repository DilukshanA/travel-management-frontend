import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (event: SelectChangeEvent) => void;
  options: SelectOption[];
  fullWidth?: boolean;
  minWidth?: number | string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  fullWidth = true,
  minWidth = 120,
}) => {
  const labelId = `${label}-label`;
  const selectId = `${label}-select`;

  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={selectId}
          value={value}
          label={label}
          onChange={(event) => onChange(event)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value.toString()}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;
