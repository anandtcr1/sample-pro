import { useEffect, useState } from "react";
import { formatDate } from "../../utils/Utilities";

function StudentDetails({student, updateStudent, nationalityList, canEdit}) {

    const [updated, setUpdated] = useState(false);
    
    const [updatedStudent, setUpdatedStudent] = useState(
        { id: student.id, firstName: '', lastName: '', dateOfBirth: '', nationalityId: 0 },
    );

    const handleInputChange = (e) => {
        setUpdated(false);
        const { name, value } = e.target;
        setUpdatedStudent({
            ...updatedStudent,
              [name]: value
            });
            
        updateStudent(updatedStudent);
        setUpdated(true);
    };
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <label htmlFor='firstName'>First Name : </label>
                    {/* <input type='hidden' value={student.id} name="id" /> */}
                    <input type='text' name='firstName' className='form-control' placeholder='Enter name' 
                        defaultValue={student.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={!canEdit && student.id > 0}
                        />                      
                </div>
                <div className="col-6">
                    <label htmlFor='lastName' >Last Name : </label>
                    <input type='text' name='lastName' className='form-control' placeholder='Enter last name' 
                        defaultValue={student.lastName}
                        onChange={handleInputChange}
                        required
                        disabled={!canEdit && student.id > 0}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor='nationalityId' >Nationality : </label>

                    <select
                        name="nationalityId"
                        className='form-control'
                        onChange={handleInputChange}
                        defaultValue={student.nationalityId}
                        required
                        disabled={!canEdit && student.id > 0}
                        >
                        {nationalityList.map(nationality => (
                            <option key={nationality.id} value={nationality.id} >
                            {nationality.countryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-6">
                
                    <label htmlFor="dateOfBirth" >Date of birth</label>
                    <input type="date" name="dateOfBirth" className="form-control"  
                        defaultValue={formatDate(student.dateOfBirth)}
                        onChange={handleInputChange}
                        required
                        disabled={!canEdit && student.id > 0}
                    />
                </div>
            </div>
        </div>
    )
}

export default StudentDetails;

