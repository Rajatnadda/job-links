import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false
    },
    reducers: {
        setUser: (state, action)  => {
            state.user = action.payload;
        },
        },
})
        export const {setLoading} = authSlice.actions;

export default authSlice.reducer;

export const authSliceReducer = authSlice.reducer;