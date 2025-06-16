"use client"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import axios from "axios";

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

        console.log("ID Token:", idToken);

        await axios.post('http://localhost:4000/api/auth/signup',{
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

        // console.log("User credentials:", userCredential);

        // const firebaseUser = userCredential.user;

        // console.log("Firebase user created:", firebaseUser)

        // console.log("User signed up successfully:", {
        //     uid: firebaseUser.uid,
        //     email: firebaseUser.email,
        // });
        
    } catch (error) {
        console.error("Error signing up with email and password:", error);
    }
}

export default signupWithEmailPassword;