import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: userData ? userData : null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logInUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logOutUser: (state, action) => {
            
        }
    }

})

export const { logInUser, logOutUser } = userSlice.actions
export default userSlice.reducer