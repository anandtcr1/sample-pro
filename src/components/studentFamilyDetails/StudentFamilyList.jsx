import React, { useEffect, useState } from 'react'
import { formatDate } from '../../utils/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFamily } from '../../reducers/family/SaveFamilyReducerSlice';

function StudentFamilyList({nationalityList, familyList, onUpdateFamily, canEdit, studentId}) {
    
    const [familyMembers, setFamilyMembers] = useState([
        { id: 0, firstName: '', lastName: '', dateOfBirth: '', relationshipId: 0, nationality: 0 },
    ]
   );

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

    const dispatch = useDispatch();
    const deleteMembers = useSelector((state) => state.fetchFamilies.data);
    const isLoading = useSelector((state) => state.fetchFamilies.isLoading);
    const isError = useSelector((state) => state.fetchFamilies.isError);

   useEffect(() => {
    const newData = [...familyList];
    setFamilyMembers(newData);
   },[familyList])

   const handleFamilyChange = (index, e) => {
       const { name, value } = e.target;
       const updatedFamilyMembers = familyMembers.map((member, i) =>
         i === index ? { ...member, [name]: value } : member
       );
       setFamilyMembers(updatedFamilyMembers);
       onUpdateFamily(updatedFamilyMembers);
     };

   const handleAddFamilyMember = () => {
       setFamilyMembers([...familyMembers, { id: 0, firstName: '', lastName: '', dateOfBirth: '', relationshipId: 0, nationality: 0 }]);
   };

   const handleRemoveFamilyMember = (index, id) => {
        if(id > 0) {
            dispatch(deleteFamily(id));
        }
       const updatedFamilyMembers = familyMembers.filter((_, i) => i !== index);
       setFamilyMembers(updatedFamilyMembers);
       console.log()
   };

   return(
       <>
           <button className='btn btn-sm btn-success me-1 ' type="button" onClick={handleAddFamilyMember} disabled={!canEdit && studentId > 0}>
           Add Family Member
           </button>

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
                               <input type='text' name='firstName' className='form-control' placeholder='Enter first name' 
                                   defaultValue={member.firstName}
                                   onChange={(e) => handleFamilyChange(index, e)}
                                   required
                                   disabled={!canEdit && studentId > 0}
                               />
                           </div>
                           <div className="col">
                               <input type='text' name='lastName' className='form-control' placeholder='Enter last email' 
                                   defaultValue={member.lastName}
                                   onChange={(e) => handleFamilyChange(index, e)}
                                   required
                                   disabled={!canEdit && studentId > 0}
                               />
                           </div>
                           <div className="col">
                               <input type="date" name="dateOfBirth" className="form-control"  
                                   defaultValue={formatDate(member.dateOfBirth)}
                                   onChange={(e) => handleFamilyChange(index, e)}
                                   required
                                   disabled={!canEdit && studentId > 0}
                               />
                           </div>
                           <div className="col">
                               
                               <select
                                   name="relationshipId"
                                   className='form-control'
                                   onChange={(e) => handleFamilyChange(index, e)}
                                   required
                                   disabled={!canEdit && studentId > 0}
                                   defaultValue={member.relationshipId}
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
                                   defaultValue={member.nationalityId}
                                   required
                                   disabled={!canEdit && studentId > 0}
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
                           disabled={!canEdit && studentId > 0}
                           onClick={() => handleRemoveFamilyMember(index, member.id)}
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
       </>
       

   )
}

export default StudentFamilyList
