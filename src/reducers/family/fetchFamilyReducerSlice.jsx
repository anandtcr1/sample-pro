import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFamilies = createAsyncThunk('fetchFamilies', async (studentId) => {
    const response = await axios.get(`https://localhost:7060/api/Students/${studentId}/FamilyMembers`);
    return response.data;
});

const familiesSlice = createSlice({
    name: "families",
    initialState: {
        isLoading: true,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFamilies.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(fetchFamilies.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(fetchFamilies.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        })
    }
});

export default familiesSlice.reducer;