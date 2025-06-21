"Use client";
import { Box, Button, FormControl, InputLabel, TextField } from '@mui/material'
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BasicSelectField from '../ui/BasicSelectField';

const AddRoleAndName = () => {

  const [role, setRole] = React.useState<string>('');


    const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    console.log(event.target.value);
  };

  console.log(role);
  return (
    <Box>
      
      <Box sx={{
        display: 'flex',
        gap: 2
      }}>
        <Box>
          <TextField id='firstName' label="First Name" variant='outlined'
              name='firstName' size='medium'
          />
        </Box>
        <Box>
          <TextField id='lastName' label="Last Name" variant='outlined'
              name='lastName' size='medium'
          />
        </Box>
      </Box>

      <Box
        sx={{
          gap: 2,
          marginTop: 2,
        }}
      >
        <BasicSelectField
          fieldName="Role"
          names={['Admin', 'User', 'Guest', 'Super Admin']}
          onChange={(value : string) => setRole(value)}
        />
      </Box>
      <Box
        sx={{
        gap: 2,
        marginTop: 2,
        }}
      >
        <Button variant='contained' fullWidth size='large'
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddRoleAndName