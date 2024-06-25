import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNationalities } from '../../reducers/nationality/fetchNationalityListReducerSlice';
import { fetchStudents } from '../../reducers/students/fetchStudentListReducerSlice';
import { formatDate } from '../../utils/Utilities';
import { toast } from 'react-toastify';
import StudentModalPopup from './StudentModalPopup';

const StudentList = ({canEdit}) => {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.data);
    const isLoading = useSelector((state) => state.students.isLoading);
    const isError = useSelector((state) => state.students.isError);
    const nationalities = useSelector((state) => state.nationalities.data);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(
      {id: 0, firstName: '', lastName: '', dateOfBirth: '', nationalityId: 0}
    );
  
    useEffect(() => {
      if(isLoading == true) {
        dispatch(fetchStudents());
        dispatch(fetchNationalities());
      }
    }, [isLoading, dispatch]);
    
    const handleEdit = (item) => {
      if(item!=null){
        setSelectedItem(item);
        setShowModal(true);
      }
    }

    const handleCloseModal = () => {
      setShowModal(false);
    }
  
    const handleCreate = () => {
      setSelectedItem({id: 0, firstName: '', lastName: '', dateOfBirth: '', nationalityId: 0});
      setShowModal(true);
    }
  
    const handleModalPopup = (modalPopupStatus) => {
      setShowModal(modalPopupStatus);
      if(!modalPopupStatus){
        window.location.reload();
      }
    }
  
    const onSave = (student) => {
      toast.success('Data saved successfully!');
    }
  
    let content;
    if(isLoading == true){
      content = <div>Loading..</div>;
    } else {
      content = (
  <div className='container'>
      <h2>Student List</h2>
    {/* <Link to="/student/create" className='btn btn-success my-3'>Create</Link> */}
    <button onClick={() => handleCreate()} className='btn btn-sm btn-primary ms-2' >Create Student</button>
    
    {/* <StudentPopup show={showModal} student1={selectedItem} nationalityList={nationalities} handleMoalPopup={handleModalPopup} onSave={onSave} canEdit={canEdit} /> */}
    <StudentModalPopup show={showModal} onClose={handleCloseModal} student={selectedItem} nationalities={nationalities} handleMoalPopup={handleModalPopup} canEdit={canEdit} />
    <table className='table'>
      <thead>
          <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
        
          {  students.map((student, index) => (
              <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{formatDate(student.dateOfBirth)}</td>
                  <td>
                      <button onClick={() => handleEdit(student)} className='btn btn-sm btn-primary ms-2'>Edit Student</button>
                  </td>
              </tr>
          ))}
      </tbody>
    </table>
  
  
  </div>
      )
    }
    if(students)
    return content;
  
  }

  export default StudentList;