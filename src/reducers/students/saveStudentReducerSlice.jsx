import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createStudent = createAsyncThunk('createStudent', async (student) => {
    const response = await axios.post('https://localhost:7060/api/Students', student);
    console.log('resCreate', response);
    return response.data;
});

export const updateStudent = createAsyncThunk('updateStudent', async (student) => {
    const response = await axios.put(`https://localhost:7060/api/Students/${student.id}`, student)
    return response.data;
    // dispatch({ type: 'CREATE_STUDENT_SUCCESS', payload: response.data });
});

const saveStudentSlice = createSlice({
    name: "student",
    initialState: {
        isLoading: true,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(createStudent.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(createStudent.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(createStudent.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        }),

        builder.addCase(updateStudent.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.isLoading = false,
            state.data = action.payload
        }),
        builder.addCase(updateStudent.rejected, (state, action) => {
            console.log('error', action);
            state.isError = true
        })
    }
})

export default saveStudentSlice.reducer;