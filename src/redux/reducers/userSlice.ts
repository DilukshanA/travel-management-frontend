import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UserState = {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

const initialState : UserState = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { firstName, lastName, role, email } = action.payload;
            state.firstName = firstName || state.firstName;
            state.lastName = lastName || state.lastName;
            state.role = role || state.role;
            state.email = email || state.email;
        }
    }
})

// export actions
export const { setUserData } = userSlice.actions;

// export const { setUserData } = userSlice.actions;
export const selectUserData = (state : RootState) => state.userSlice;

// export reducer
export const userSliceReducer = userSlice.reducer;