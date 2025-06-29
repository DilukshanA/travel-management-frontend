import { createSlice } from "@reduxjs/toolkit";

type UserState = {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

const initialState : UserState = {
    firstName: "abc",
    lastName: "def",
    role: "user",
    email: "dilukshan",
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
export const selectUser = (state : any) => state.user;

// export reducer
export const userSliceReducer = userSlice.reducer;