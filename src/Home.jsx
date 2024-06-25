import React, { useState } from 'react'
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


