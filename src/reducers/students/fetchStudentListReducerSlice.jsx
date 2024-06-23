import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk('fetchStudents', async () => {
    const response = await axios.get('https://localhost:7060/api/Students');
    return response.data;
});

const studentSlice = createSlice({
    name: "students",
    initialState: {
        isLoading: true,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(fetchStudents.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        })
    }
})

export default studentSlice.reducer;