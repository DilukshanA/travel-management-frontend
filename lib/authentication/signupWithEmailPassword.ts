import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

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

        const firebaseUser = userCredential.user;

        console.log("User signed up successfully:", {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
        });
        
    } catch (error) {
        console.error("Error signing up with email and password:", error);
    }
}

export default signupWithEmailPassword;