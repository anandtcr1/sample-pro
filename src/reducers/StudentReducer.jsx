import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentList } from "../data/Data";

export const fetchStudents = createAsyncThunk("fetchStudents", async () => {
    const response = await fetch("https://localhost:7060/api/Students");
    console.log(response);
    return response.json();
})

const studentSlice = createSlice({
    name: "students",
    initialState: {
        isLoading: false,
        data: null,
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
            console.log('error', action.payload);
            state.isError = true
        })
    },
    // initialState: studentList,
    // reducers: {
    //     addStudent: (state, action) => {
    //         state.push(action.payload);
    //     },
    //     updateStudent: (state, action) => {
    //         const {id, name, email} = action.payload;
    //         const uStudent = state.find(student => student.id == id);
            
    //         if(uStudent) {
    //             uStudent.name = name;
    //             uStudent.email = email;
    //         }
    //     },
    //     deleteStudent: (state, action) => {
    //         const {id} = action.payload;
    //         const uStudent = state.find(student => student.id == id);
    //         if(uStudent) {
    //             return state.filter(f => f.id !== id)
    //         }
    //     }
    // }
})

export const { addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;