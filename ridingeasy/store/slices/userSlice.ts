import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name: 'user',
    initialState: "",
    reducers: {
        setUser: (state, action) => {
           state=action.payload;
            return state;
        },
        clearUser: (state) => {
            state="";
            return state;
        }
    }
})

export const {setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;