"use client"
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebaseConfig';
import { useLogoutMutation } from '@/redux/reducers/authApiSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Logout = () => {

    const [ logout , { isLoading, isSuccess, isError, error }] = useLogoutMutation();

    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Sign out from Firebase
            const resultFirebase = await signOut(auth);

            console.log('Firebase Sign Out Result:', resultFirebase);

            // clear user data from redux store and cookies
            await logout().unwrap();
            toast.success('Logged out successfully!');

            // navigate to login page
            setTimeout(() => {
                router.push('/login');
            }, 500);
        } catch (error) {
            toast.error('Logout failed! Please try again.');
        }
    }
  return (
    <Tooltip title="Logout" arrow>
    {/* <IconButton onClick={() => setLoading(true)} loading={loading}></IconButton> */}
        <IconButton onClick={handleLogout}>
            <LogoutIcon/>
        </IconButton>
    </Tooltip>
  )
}

export default Logout