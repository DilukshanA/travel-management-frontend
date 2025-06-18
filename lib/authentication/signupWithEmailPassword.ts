"use client"
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import axios from "axios";
import { getErrorMessage } from "./authExceptions";
import toast from "react-hot-toast";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const signupWithEmailPassword = async (values : FormValues) => {
    try {
        const userCredential =await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );

        const idToken = await userCredential.user.getIdToken();

        //console.log("ID Token:", idToken);

        const response = await axios.post('http://localhost:4000/api/auth/signup',{
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            firstName: values.firstName,
            lastName: values.lastName,
            role: 'user'
        }, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            }
        })
        // Display: User registered successfully!
        toast.success(response.data.message);
    } 
    catch (error) {

        if ((error as AuthError).code) {
            //firebase error handling
            const authError = error as AuthError;
            const errorMessage = getErrorMessage(authError.code);
            toast.error(errorMessage, {
            duration: 3000,
            position: 'top-right',
        })
        } else if (axios.isAxiosError(error)){
            //axios error handling
            toast.error(error.response?.data?.message || "Signup failed", { 
                duration: 3000,
                position: 'top-right'
            });
        } else {
            // other errors
            toast.error("An unexpected error occurred", { 
                duration: 3000,
                position: 'top-right'
            });
        }
    }
}

export default signupWithEmailPassword;