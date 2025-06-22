"Use client";
import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { SelectChangeEvent } from '@mui/material/Select';
import BasicSelectField from '../ui/BasicSelectField';
import { useFormik } from 'formik';

const AddRoleAndName = () => {

  const [role, setRole] = React.useState<string>('');


    const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    console.log(event.target.value);
  };

  type FormValueTyoes = {
    firstName: string;
    lastName: string;
    role: string;
  }

  type FormErrorTyoes = {
    firstName?: string;
    lastName?: string;
    role?: string;
  }

  const initialValues: FormValueTyoes = {
    firstName: '',
    lastName: '',
    role: ''
  }

  const onSubmit = () => {

  }

  const validate = (values : FormValueTyoes) => {
    const errors: FormErrorTyoes = {};

    if (!values.role) {
      errors.role = 'Role is required';
    }

    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }

    return errors;
  }

  console.log(role ? role : 'No role selected');

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      
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

      {/* Submit Button */}
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