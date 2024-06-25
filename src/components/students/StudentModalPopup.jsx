import React, { useEffect, useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import StudentDetails from "./StudentDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchFamilies } from "../../reducers/family/fetchFamilyReducerSlice";
import StudentFamilyList from "../studentFamilyDetails/StudentFamilyList";
import { createStudent, updateStudent } from "../../reducers/students/saveStudentReducerSlice";
import { createFamily, updateFamily } from "../../reducers/family/SaveFamilyReducerSlice";

function StudentModalPopup({show, onClose, student, nationalities, handleMoalPopup, canEdit}) {
    
    const [studentDetails, setStudentDetails] = useState({
        id: student?.id,
        firstName: student?.firstName,
        lastName: student?.lastName,
        dateOfBirth: student?.dateOfBirth,
        nationalityId: student?.nationalityId
    });

    const [familyMemberList, setFamilyMemberList] = useState([]);

    const dispatch = useDispatch();
    const familyMembers = useSelector((state) => state.fetchFamilies.data);
    const isLoading = useSelector((state) => state.fetchFamilies.isLoading);
    const isError = useSelector((state) => state.fetchFamilies.isError);

    const saveFamily = useSelector((state) => state.fetchFamilies.data);
    const isFamilySaveLoading = useSelector((state) => state.fetchFamilies.isLoading);

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if(student)
            if(show == true) {
                if(student?.id > 0)
                    dispatch(fetchFamilies(student.id));
            }
    }, [show, dispatch]);

    const handleClose = () => {
        handleMoalPopup(false);
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if(studentDetails.id <= 0) {
            var addStudent = {
                firstName: studentDetails.firstName,
                lastName: studentDetails.lastName,
                dateOfBirth: studentDetails.dateOfBirth,
                nationalityId: studentDetails.nationalityId
            }
            let res = await dispatch(createStudent(addStudent));
            if(familyMemberList)
            {
                familyMemberList.map((currentValue) => {
                    let familyToPost = {
                        firstName : currentValue.firstName,
                        lastName : currentValue.lastName,
                        dateOfBirth : currentValue.dateOfBirth,
                        relationshipId : currentValue.relationshipId,
                        nationalityId: currentValue.nationalityId
                    }
console.log('res', res)
                    dispatch(createFamily({studentId:res.payload.id, family: familyToPost}))
                });

            }
            setShowSuccess(true);
        }
        else {
            let res = await dispatch(updateStudent(studentDetails));
            if(familyMemberList)
            {
                familyMemberList.map((currentValue) => {
                    let familyToPost = {
                        firstName : currentValue.firstName,
                        lastName : currentValue.lastName,
                        dateOfBirth : currentValue.dateOfBirth,
                        relationshipId : currentValue.relationshipId,
                        nationalityId: currentValue.nationalityId
                    }
                    if(currentValue.id == 0){
                        dispatch(createFamily({studentId:student.id, family: familyToPost}))
                    }
                    else {
                        dispatch(updateFamily({id:currentValue.id, family: familyToPost}))
                    }
                });

            }
        }
        setShowSuccess(true);
    }

    const handleDetailsChange = (updatedDetails) => {
        setStudentDetails(updatedDetails);
      };

    const handleFamilyListChange = (updatedFamilyList) => {
        setFamilyMemberList(updatedFamilyList);
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
                 <Modal.Header closeButton>
                 <Modal.Title>Student Details</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <StudentDetails student={student} updateStudent={handleDetailsChange} nationalityList={nationalities} canEdit={canEdit}/>
                        
                        <StudentFamilyList familyList={familyMembers} nationalityList={nationalities} onUpdateFamily={handleFamilyListChange} canEdit={canEdit} studentId={student.id} />
                        <div>
                            <button className='btn btn-sm btn-secondary me-1 ' onClick={handleClose}>
                                Close
                            </button>
                            <button className='btn btn-sm btn-success me-1 ' disabled={!canEdit && student.id > 0} type="submit">Save</button>
                        </div>
                        <Alert hidden={!showSuccess} variant="success" onClose={() => setShowSuccess(false)} dismissible>
                            <p>Saved Successfully</p>
                        </Alert>
                    </form>
                 </Modal.Body>
                 <Modal.Footer>
                
                 </Modal.Footer>
             </Modal>
    )
}

export default StudentModalPopup;