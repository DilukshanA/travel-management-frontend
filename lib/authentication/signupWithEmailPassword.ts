import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const signupWithEmailPassword = async (email : string, password : string) => {
    try {
        const userCredential =await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up with email and password:", error);
    }
}

export default signupWithEmailPassword;