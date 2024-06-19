import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import StudentReducer from './reducers/StudentReducer.jsx'


const store = configureStore({
  reducer: {
    students: StudentReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store } >
      <App />
    </Provider>
  </React.StrictMode>,
)
