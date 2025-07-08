import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

type SelectFieldProps = {
    id?: string;
    value?: number | string;
    label?: string;
    onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
    options?: string[];
}

const SelectField = (
    { 
        id, value, label, onChange, options 
    } : SelectFieldProps
) => {
  return (
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={onChange}
    >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    </FormControl>
  )
}

export default SelectField