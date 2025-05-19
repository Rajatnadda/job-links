import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {
        setUser: (state, action)  => {
            state.user = action.payload;
        },
        
            setLoading: (state, action) => {
                state.loading = action.payload;
        },
    }
})
        export const {setLoading, setUser} = authSlice.actions;

export default authSlice.reducer;

export const authSliceReducer = authSlice.reducer;