import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import toast from "react-hot-toast";

const signupWithGoogle = async () => {

    try {
        // sign up with google popup firebase auth
        const userCredential = await signInWithPopup(auth, googleProvider);
        console.log('User signed up with Google:', userCredential.user);
        toast.success('User signed up with Google successfully!', {
            duration: 3000,
            position: 'top-right'
        });

    } catch (error) {
        toast.error('Failed to sign up with Google. Please try again.', {
            duration: 3000,
            position: 'top-right'
        });
        console.error('Error signing up with Google:', error);
    }
}

export default signupWithGoogle;