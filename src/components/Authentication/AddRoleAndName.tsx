"Use client";
import { Box, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';
import { validateAddRoleAndName } from '@/forms/add-role-and-name/validation';
import { FormValueTypes } from '@/forms/add-role-and-name/types';
import BasicSelectField from '../ui/BasicSelectField';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '@/redux/reducers/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setUserData } from '@/redux/reducers/userSlice';
import LoadingBackdrop from '../ui/LoadingBackdrop';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddRoleAndName = () => {

  const { data : userData, isLoading : isUserDataLoading } = useGetUserDataQuery();
  const [ updateUserData, { isLoading, isSuccess, isError, error} ] = useUpdateUserDataMutation();

  const userDetails = useSelector(selectUserData);

  const dispatch = useDispatch();

  const router = useRouter();

  // Effect to set user data in redux store
  useEffect(() => {
    if (userData) {
      dispatch(setUserData(userData.user));
    }
  },[userData, dispatch]);

  const initialValues: FormValueTypes = {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    role: userData?.user.role || '',
  }

  const onSubmit = async () => {
    try {
      const result = await updateUserData({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        role: formik.values.role
      }).unwrap();
      // toast('Welcome to Autonix!', {icon: '🙂',});

      // navigate to home page after 1 second
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err: any) {
      if (err?.originalStatus === 404) {
        toast.error('Server problem occurred!');
      }
      else if (err?.originalStatus === 500) {
        toast.error('Internal server error!');
      }
      else {
        toast.error('Error occured');
      }
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: onSubmit,
    validate: validateAddRoleAndName
  })
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      
      <Box sx={{
        display: 'flex',
        gap: 2
      }}>
        <LoadingBackdrop open={isLoading || isSuccess} />
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