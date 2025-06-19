import { AuthError, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import toast from "react-hot-toast";
import axios from "axios";
import { getErrorMessage } from "./authExceptions";

const signupWithGoogle = async () => {

    try {
        // sign up with google popup firebase auth
        const userCredential = await signInWithPopup(auth, googleProvider);
        //console.log('User signed up with Google:', userCredential.user);

        // get ID token
        const idToken = await userCredential.user.getIdToken();

        // console.log("ID Token : ", idToken);

        //api call to backend to register user
        const response = await axios.post('http://localhost:4000/api/auth/signup-with-google',
            {}, // No request body
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            })
        // Display: User registered successfully!
        if (response.status === 200) {
            toast.success('User signed up with Google successfully!', {
                duration: 3000,
                position: 'top-right'
            });
        } else if (response.status === 201) {
            toast.success('User logged in successfully!', {
                duration: 3000,
                position: 'top-right'
            });
        } else if (userCredential.user) {
            toast.success('sign up with Google', {
                duration: 3000,
                position: 'top-right'
            });
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 500){
                toast.error('Internal server error. Please try again later.', {
                    duration: 3000,
                    position: 'top-right'
                });
            } else if (error.code === "ECONNREFUSED"){
                toast.error('Server is not running or connection refused.', {
                    duration: 3000,
                    position: 'top-right'
                });
            } else if (error.code === "ERR_NETWORK"){
                toast.error("Network error. Check your internet connection.", {
                    duration: 3000,
                    position: 'top-right'
                });
            }
        } else if (error as AuthError){
            //firebase error handling
            const authError = error as AuthError;
            const errorMessage = getErrorMessage(authError.code);
            toast.error(errorMessage, {
                duration: 3000,
                position: 'top-right',
            })
        }

    }
}

export default signupWithGoogle;