import { createSlice } from "@reduxjs/toolkit";

const postData = JSON.parse(localStorage.getItem('post'))

const initialState = {
    posts: postData ? postData : null
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            localStorage.setItem('post', JSON.stringify(action.payload))
        },
        // logOutUser: (state, action) => {
            
        // }
    }

})

export const { setPosts } = postSlice.actions
export default postSlice.reducer