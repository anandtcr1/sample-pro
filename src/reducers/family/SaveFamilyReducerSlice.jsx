import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createFamily = createAsyncThunk('createFamily', async ({studentId, family}) => {
    const response = await axios.post(`https://localhost:7060/api/Students/${studentId}/FamilyMembers`, family)
    return response.data;
});

export const updateFamily = createAsyncThunk('updateFamily', async ({id, family}) => {
    const response = await axios.put(`https://localhost:7060/api/FamilyMembers/${id}`, family)
    return response.data;
});

export const deleteFamily = createAsyncThunk('deleteFamily', async(id) => {
    const response = await axios.delete(`https://localhost:7060/api/FamilyMembers/${id}`)
    return response.data;
});

const saveFamilySlice = createSlice({
    name: "family",
    initialState: {
        isLoading: true,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(createFamily.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(createFamily.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(createFamily.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        }),
        builder.addCase(updateFamily.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(updateFamily.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(updateFamily.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        })
    }
})

export default saveFamilySlice.reducer;