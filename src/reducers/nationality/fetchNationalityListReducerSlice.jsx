import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNationalities = createAsyncThunk('fetchNationalities', async () => {
    const response = await axios.get('https://localhost:7060/api/Nationalities');
    return response.data;
});

const nationalitiesSlice = createSlice({
    name: "nationalities",
    initialState: {
        isLoading: true,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNationalities.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(fetchNationalities.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(fetchNationalities.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        })
    }
})

export default nationalitiesSlice.reducer;