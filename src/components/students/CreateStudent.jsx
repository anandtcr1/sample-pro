import React, { useState } from 'react'
import { addStudent } from '../../reducers/StudentReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const students = useSelector((state) => state.students);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(addStudent({id: students[students.length - 1].id + 1, name: name, email: email}));
        navigate('/');
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <h3>Add new student</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name : </label>
                    <input type='text' name='name' className='form-control' placeholder='Enter name' 
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email' >Email : </label>
                    <input type='email' name='email' className='form-control' placeholder='Enter email' 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <button className='btn btn-info'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent
