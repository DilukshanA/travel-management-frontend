"Use client";
import { Box, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material'
import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';
import { initialValues } from '@/forms/add-role-and-name/initialValues';
import { validateAddRoleAndName } from '@/forms/add-role-and-name/validation';
import { FormValueTypes } from '@/forms/add-role-and-name/types';
import BasicSelectField from '../ui/BasicSelectField';

const AddRoleAndName = () => {

  const [role, setRole] = React.useState<string>('');


    const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    console.log(event.target.value);
  };

  const onSubmit = (values: FormValueTypes) => {
    console.log('form valuse: ' ,values);
  }

  // console.log(role ? role : 'No role selected');

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: validateAddRoleAndName
  })
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      
      <Box sx={{
        display: 'flex',
        gap: 2
      }}>
        <Box>
          <TextField id='firstName' label="First Name" variant='outlined'
              name='firstName' size='medium'
              onChange={formik.handleChange}
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Box>
        <Box>
          <TextField id='lastName' label="Last Name" variant='outlined'
              name='lastName' size='medium'
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
          name='role'
          names={[
            { label: 'Passenger', value: 'Passenger' },
            { label: 'Driver', value: 'Driver' },
            { label: "Driver's Assistant", value: 'Assistant' },
          ]}
          onChange={(value : string) => formik.setFieldValue('role', value)}
          value={formik.values.role}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        />
      </Box>
      {/* <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Your Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Your Role"
            name='role'
            onChange={formik.handleChange}
            value={formik.values.role}
            onBlur={formik.handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <MenuItem value={'Passenger'}>Passenger</MenuItem>
            <MenuItem value={'Driver'}>Driver</MenuItem>
            <MenuItem value={'Driver Assistant'}>Driver's Assistant</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      {/* Submit Button */}
      <Box
        sx={{
        gap: 2,
        marginTop: 2,
        }}
      >
        <Button variant='contained' fullWidth size='large'
          type='submit'
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddRoleAndName