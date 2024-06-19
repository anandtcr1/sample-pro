import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteStudent, fetchStudents } from './reducers/StudentReducer';

const Home = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data);
  const isLoading = useSelector((state) => state.students.isLoading);
  const isError = useSelector((state) => state.students.isError);

  useEffect(() => {
    if(isLoading == false) {
      dispatch(fetchStudents());
    }
  }, [isLoading, dispatch]);

  console.log(students);
  
  let content;
  if(isLoading == false){
    content = <div>Loading..</div>;
  } else {
    content = (
<div className='container'>
    <h2>Student List</h2>
  <Link to="/student/create" className='btn btn-success my-3'>Create</Link>
  
  <table className='table'>
    <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
      
        {  students.map((student, index) => (
            <tr key={index}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>
                    <Link to={`/student/edit/${student.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                    <button onClick={() => handleDelete(student.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
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
export default Home
// let isLoad = false;
// let students = null;

// const state = useSelector((state) => state);
// console.log(state); 
// useEffect(() => {
//   students = dispatch(fetchStudents());
// })
 
// console.log(students)
// const handleDelete = (id) => {
//     dispatch(deleteStudent({id:id}));
// }

