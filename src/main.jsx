import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import fetchStudentReducer from './reducers/students/fetchStudentListReducerSlice.jsx'
import fetchNationalityListReducerSlice from './reducers/nationality/fetchNationalityListReducerSlice.jsx'
import saveStudentReducerSlice from './reducers/students/saveStudentReducerSlice.jsx'
import SaveFamilyReducerSlice from './reducers/family/SaveFamilyReducerSlice.jsx'
import fetchFamilyReducerSlice from './reducers/family/fetchFamilyReducerSlice.jsx'


const store = configureStore({
  reducer: {
    students: fetchStudentReducer,
    nationalities: fetchNationalityListReducerSlice,
    saveStudent: saveStudentReducerSlice,
    saveFamily: SaveFamilyReducerSlice,
    fetchFamilies: fetchFamilyReducerSlice
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store } >
      <App />
    </Provider>
  </React.StrictMode>,
)
