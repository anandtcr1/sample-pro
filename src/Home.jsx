import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchStudents } from './reducers/students/fetchStudentListReducerSlice';
import StudentPopup from './components/students/StudentPopup';
import { formatDate } from './utils/Utilities';
import { fetchNationalities } from './reducers/nationality/fetchNationalityListReducerSlice';
import StudentList from './components/students/StudentList';
import Menu from './components/menu/Menu';
import { ToastContainer } from 'react-bootstrap';

const Home = () => {
  const [canEdit, setCanEdit] = useState(false)
  const setSelectedUserType = (updatedUserType) => {
    // type 2 is registrar
    // canEdit = updatedUserType == 2;
    setCanEdit(updatedUserType == 2);
  }
  return (
    <>
      <ToastContainer />
      <Menu selectedUserStatus={setSelectedUserType} />
      <StudentList canEdit={canEdit} />
    </>
    
  )
}
export default Home


