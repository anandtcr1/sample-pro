import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { formatDate } from "../../utils/Utilities";
import Family from "../studentFamilyDetails/Family";
import { useDispatch, useSelector } from "react-redux";
import { createStudent, updateStudent } from "../../reducers/students/saveStudentReducerSlice";
import { createFamily, updateFamily } from "../../reducers/family/SaveFamilyReducerSlice";
import { toast } from "react-toastify";
import Alert from 'react-bootstrap/Alert';
import { fetchFamilies } from "../../reducers/family/fetchFamilyReducerSlice";

// function StudentPopup({ show, student, nationalityList, handleMoalPopup, onSave, canEdit}) {
//     const dispatch = useDispatch();
//     const updatedStudent = useSelector((state) => state.student);
//     const isLoading = useSelector((state) => state.students.isLoading);
//     const isError = useSelector((state) => state.students.isError);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [selStudentId, setSelStudentId] = useState(0);
//     const [formData, setFormData] = useState({
//         id: 0,
//         firstName: '',
//         lastName: '',
//         dateOfBirth: '',
//         nationalityId: 0
//     });
//     const [saveComplted, setSaveCompleted] = useState(false);

//     useEffect(() => {
//         if(student) {
//             setFormData(student);
//             setSelStudentId(student.id);
//         }
//     }, [student]);

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]:value,
//         }));
//     };

//     const  handleSubmit = (e) => {
//         e.preventDefault();
//         if(formData.id > 0) {
//             dispatch(updateStudent(formData));
//         }
//         else {
//             console.log('sss');
//             dispatch(createStudent(formData));
//             setFormData(student);
//         }
//         setShowSuccess(true);
//         onSave(formData);
//     }

//     const onFamilySave = async (family) => {
//         let familyToPost = {
//             firstName : family.firstName,
//             lastName : family.lastName,
//             dateOfBirth : family.dateOfBirth,
//             relationshipId : family.relationshipId,
//             nationalityId: family.nationalityId
//         }
//         if(formData.id > 0){
//             console.log('1')
//             dispatch(updateStudent(formData));
//             if(family.id > 0)
//                 dispatch(updateFamily({id:family.id, family: familyToPost}))
//             else
//                 dispatch(createFamily({studentId:formData.id, family:familyToPost}))
//         }
//         else {
//             console.log('2')
//             let res = await dispatch(createStudent(formData));
//             setFormData(res.payload);
//             setSelStudentId(res.payload.id)
//             dispatch(createFamily({studentId:res.payload.id, family:familyToPost}));
//             setSelStudentId(res.payload.id)
//             setSaveCompleted(true);
//             setSaveCompleted(false);
//         }
        
//     }

//     const handleClose = () => {
//         handleMoalPopup(false);
//     } 
//     return (
//             <Modal show={show} onHide={handleClose} size="lg">
//                 <Modal.Header closeButton>
//                 <Modal.Title>Student Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={handleSubmit}>

//                         <div className="container ">
//                             <div className="row">
//                                 <div className="col-md-6 ">
//                                     <div>
//                                         <label htmlFor='firstName'>First Name : </label>
//                                         <input type='text' name='firstName' className='form-control' placeholder='Enter name' 
//                                             value={formData.firstName || ''}
//                                             required
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6 ">
//                                     <div>
//                                         <label htmlFor='lastName' >Last Name : </label>
//                                         <input type='text' name='lastName' className='form-control' placeholder='Enter email' 
//                                             value={formData.lastName || ''}
//                                             required
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="col-md-6 ">
//                                     <div>
//                                         <label htmlFor="dateOfBirth" >Date of birth</label>
//                                         <input type="date" name="dateOfBirth" className="form-control"  
//                                             value={formatDate(formData.dateOfBirth) || ''}
//                                             required
//                                             onChange={handleChange}
//                                         />

//                                     </div>
//                                 </div>

//                                 <div className="col-md-6 ">
//                                     <div>
//                                         <label htmlFor='nationalityId' >Nationality : </label>

//                                         <select
//                                             name="nationalityId"
//                                             className='form-control'
//                                             onChange={handleChange}
//                                             >
//                                             {nationalityList.map(nationality => (
//                                                 <option key={nationality.id} value={nationality.id}>
//                                                 {nationality.countryName}
//                                                 </option>
//                                             ))}
//                                         </select>

//                                     </div>
//                                 </div>

//                             </div>

//                             <div className="row">
//                                 <div className="col-md-12 ">
//                                     <Family studentId={selStudentId} nationalityList={nationalityList} handleFamilySave={onFamilySave} saveCompleted={saveComplted} />
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <button className='btn btn-sm btn-secondary me-1 ' onClick={handleClose}>
//                                 Close
//                             </button>
//                             <button type="submit" className='btn btn-sm btn-primary me-1' disabled={!canEdit} >
//                                 Save Changes
//                             </button>
//                             <Alert hidden={!showSuccess} variant="success" onClose={() => setShowSuccess(false)} dismissible>
//                                 <p>Saved Successfully</p>
//                             </Alert>
                            
//                         </div>
//                     </form>

//                 </Modal.Body>
//                 <Modal.Footer>
                
//                 </Modal.Footer>
//             </Modal>
//     )
// }

// export default StudentPopup;


function StudentPopup ({ show, student1, nationalityList, handleMoalPopup, onSave, canEdit}) {

    const dispatch = useDispatch();
    const families = useSelector((state) => state.fetchFamilies.data);
    const isLoading = useSelector((state) => state.fetchFamilies.isLoading);
    const isError = useSelector((state) => state.fetchFamilies.isError);
    const [loadRows, setLoadRows] = useState(true);

    useEffect(() => {
        let sId = student1?.id;
        if(isLoading == true)
            if(sId != undefined) {
                dispatch(fetchFamilies(sId));
                setLoadRows(false);
            }
                
      }, [loadRows, dispatch]);

      if(families) {
        console.log('families -> ', families);
      }
      
    const handleClose = () => {
        handleMoalPopup(false);
    } 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:value,
        }));
    };

    const relationshipList = [
        {
            "id": 1,
            "relation": "Parent"
        },
        {
            "id": 2,
            "relation": "Sibling"
        },
        {
            "id": 3,
            "relation": "Spouse"
        }
    ];
    
    const [student, setStudent] = useState({
        id: student1?.id,
        firstName: student1?.firstName,
        lastName: student1?.lastName,
        dateOfBirth: student1?.dateOfBirth,
        nationalityId: student1?.nationalityId
      });

      const [familyMembers, setFamilyMembers] = useState([
        { id: 0, firstName: '', lastName: '', dateOfBirth: '', relationshipId: 0, nationality: 0 },
      ]);
    
      const handleStudentChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
          ...prevStudent,
          [name]: value,
        }));
      };
    
      const handleFamilyChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFamilyMembers = familyMembers.map((member, i) =>
          i === index ? { ...member, [name]: value } : member
        );
        setFamilyMembers(updatedFamilyMembers);
      };
    
      const handleAddFamilyMember = () => {
        setFamilyMembers([...familyMembers, { id: 0, firstName: '', lastName: '', dateOfBirth: '', relationshipId: 0, nationality: 0 }]);
      };
    
      const handleRemoveFamilyMember = (index) => {
        const updatedFamilyMembers = familyMembers.filter((_, i) => i !== index);
        setFamilyMembers(updatedFamilyMembers);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();



        console.log('Student Details:', student);
        console.log('Family Members:', familyMembers);

        if(student.id == 0) {
            let res = await dispatch(createStudent(student));
        // setSelStudentId(res.payload.id)

            familyMembers.map(d => {
                let familyToPost = {
                    firstName : d.firstName,
                    lastName : d.lastName,
                    dateOfBirth : d.dateOfBirth,
                    relationshipId : d.relationshipId,
                    nationalityId: d.nationalityId
                }
                dispatch(createFamily({studentId:res.payload.id, family:familyToPost}));
            })
        }
        else {
            dispatch(createStudent(student));
            familyMembers.map(d => {
                let familyToPost = {
                    firstName : d.firstName,
                    lastName : d.lastName,
                    dateOfBirth : d.dateOfBirth,
                    relationshipId : d.relationshipId,
                    nationalityId: d.nationalityId
                }
                dispatch(createFamily({studentId:student.id, family:familyToPost}));
            })
        }
        
        // let res = await dispatch(createStudent(formData));
        // setFormData(res.payload);
        // setSelStudentId(res.payload.id)
        // dispatch(createFamily({studentId:res.payload.id, family:familyToPost}));

      };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
                 <Modal.Header closeButton>
                 <Modal.Title>Student Details</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>

                 

<div className="App">
      <form onSubmit={handleSubmit}>

        <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor='firstName'>First Name : </label>
                            <input type='text' name='firstName' className='form-control' placeholder='Enter name' 
                                value={student.firstName || ''}
                                onChange={handleStudentChange}
                                required
                                />                      
                        </div>
                        <div className="col-6">
                            <label htmlFor='lastName' >Last Name : </label>
                            <input type='text' name='lastName' className='form-control' placeholder='Enter email' 
                                value={student.lastName || ''}
                                onChange={handleStudentChange}
                                required
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor='nationalityId' >Nationality : </label>

                            <select
                                name="nationalityId"
                                className='form-control'
                                onChange={handleStudentChange}
                                required
                                >
                                {nationalityList.map(nationality => (
                                    <option key={nationality.id} value={nationality.id}>
                                    {nationality.countryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                        
                            <label htmlFor="dateOfBirth" >Date of birth</label>
                            <input type="date" name="dateOfBirth" className="form-control"  
                                value={formatDate(student.dateOfBirth) || ''}
                                onChange={handleStudentChange}
                                required
                            />
                        
                        </div>
                    </div>
                </div>

        <Modal.Title>Family Details</Modal.Title>
        <button className='btn btn-sm btn-success me-1 ' type="button" onClick={handleAddFamilyMember}>
          Add Family Member
        </button>
        <hr />
        {familyMembers.map((member, index) => (
          <div key={index} className="family-member">
          <div className="container-fluid">
                <div hidden={index!=0} className="row">
                    <div className="col">
                        <label>First Name:</label>
                    </div>
                    <div className="col">
                    <label>Last Name:</label>
                    </div>
                    <div className="col">
                        <label>Date Of Birth:</label>
                    </div>
                    <div className="col">
                    <label>Relationship:</label>
                    </div>
                    <div className="col">
                        <label>Nationality:</label>
                    </div>
                    <div className="col">
                        <label>Action:</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        
                        {/* <input
                            type="text"
                            name="name"
                            value={member.name}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        /> */}

                        <input type='text' name='firstName' className='form-control' placeholder='Enter first name' 
                            value={member.firstName || ''}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        />
                    </div>
                    <div className="col">
                        
                        {/* <input
                            type="text"
                            name="relation"
                            value={member.relation}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        /> */}
                        <input type='text' name='lastName' className='form-control' placeholder='Enter last email' 
                            value={member.lastName || ''}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        />
                    </div>
                    <div className="col">
                        
                        {/* <input
                            type="number"
                            name="age"
                            value={member.age}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        /> */}
                        <input type="date" name="dateOfBirth" className="form-control"  
                            value={formatDate(member.dateOfBirth) || ''}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        />
                    </div>
                    <div className="col">
                        
                        <select
                            name="relationshipId"
                            className='form-control'
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                            >
                            {relationshipList.map(relationship => (
                                <option key={relationship.relation} value={relationship.id}>
                                {relationship.relation}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        
                        <select
                            name="nationality"
                            className='form-control'
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                            >
                            {nationalityList.map(nationality => (
                                <option key={nationality.countryName} value={nationality.id}>
                                {nationality.countryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                    
                    <button
                    className='btn btn-sm btn-danger me-1 '
                    type="button"
                    onClick={() => handleRemoveFamilyMember(index)}
                    >
                    Remove
                    </button>
                    </div>
                    <hr />
                </div>
            </div>


            <div>
              
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
            
          </div>
        ))}

        {families && families.map((member, index) => (
          <div key={index} className="family-member">
          <div className="container-fluid">
                
                <div className="row">
                    <div className="col">
                        
                        {/* <input
                            type="text"
                            name="name"
                            value={member.name}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        /> */}

                        <input type='text' name='firstName' className='form-control' placeholder='Enter first name' 
                            value={member.firstName || ''}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        />
                    </div>
                    <div className="col">
                        
                        {/* <input
                            type="text"
                            name="relation"
                            value={member.relation}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        /> */}
                        <input type='text' name='lastName' className='form-control' placeholder='Enter last email' 
                            value={member.lastName || ''}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        />
                    </div>
                    <div className="col">
                        
                        {/* <input
                            type="number"
                            name="age"
                            value={member.age}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        /> */}
                        <input type="date" name="dateOfBirth" className="form-control"  
                            value={formatDate(member.dateOfBirth) || ''}
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                        />
                    </div>
                    <div className="col">
                        
                        <select
                            name="relationshipId"
                            className='form-control'
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                            >
                            {relationshipList.map(relationship => (
                                <option key={relationship.relation} value={relationship.id}>
                                {relationship.relation}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        
                        <select
                            name="nationality"
                            className='form-control'
                            onChange={(e) => handleFamilyChange(index, e)}
                            required
                            >
                            {nationalityList.map(nationality => (
                                <option key={nationality.countryName} value={nationality.id}>
                                {nationality.countryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                    
                    <button
                    className='btn btn-sm btn-danger me-1 '
                    type="button"
                    onClick={() => handleRemoveFamilyMember(index)}
                    >
                    Remove
                    </button>
                    </div>
                    <hr />
                </div>
            </div>


            <div>
              
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
            
          </div>
        ))}
        
        <div>
        <button className='btn btn-sm btn-secondary me-1 ' onClick={handleClose}>
            Close
        </button>
          <button className='btn btn-sm btn-success me-1 ' type="submit">Save</button>
        </div>
      </form>
    </div>
                 </Modal.Body>
                 <Modal.Footer>
                
                 </Modal.Footer>
             </Modal>
    )

}
export default StudentPopup;