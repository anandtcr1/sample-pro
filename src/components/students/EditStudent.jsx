import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
    const {id} = useParams();
    
    const students = useSelector((state) => state.students);

    const existingStudent = students.filter(f => f.id == id);
    const {name, email} = existingStudent[0];

    const [updatedName, setName] = useState(name)
    const [updatedEmail, setEmail] = useState(email)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleUpdate = (event) => {
    //     event.preventDefault();
    //     dispatch(updateStudent({
    //         id:id,
    //         name: updatedName,
    //         email:updatedEmail
    //     }));
    //     navigate('/');
    // }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <h3>Edit student</h3>
            <form >
                <div>
                    <label htmlFor='name'>Name : </label>
                    <input type='text' name='name' className='form-control' placeholder='Enter name' 
                        value={updatedName}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email' >Email : </label>
                    <input type='text' name='email' className='form-control' placeholder='Enter email' 
                        value={updatedEmail}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <button className='btn btn-info'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditStudent;
