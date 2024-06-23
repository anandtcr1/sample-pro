import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../utils/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilies } from '../../reducers/family/fetchFamilyReducerSlice';

const Family = ({studentId, nationalityList, handleFamilySave, saveCompleted }) => {
  

    const dispatch = useDispatch();
    const families = useSelector((state) => state.fetchFamilies.data);
    const isLoading = useSelector((state) => state.fetchFamilies.isLoading);
    const isError = useSelector((state) => state.fetchFamilies.isError);

    const [updatedRows, setUpdatedRows] = useState([]);
    const [rows, setRows] = useState([...families]);
    const [editingRow, setEditingRow] = useState(null);
    const [formData, setFormData] = useState({ id: 0, firstName: '', lastName: '', dateOfBirth: '', relationshipId: 0, nationality: 0 });
    const [loadRows, setLoadRows] = useState(true);
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
    
    // useEffect(() => {
    //    if(studentId != undefined) {
    //     console.log('studentId 2 -> ', studentId);
    //     dispatch(fetchFamilies(studentId));
    //       setRows([...families]);
    //       setUpdatedRows([...families]);
    //       console.log('families -> ', families) 
    //     setLoadRows(false);
    //    }
    // }, [loadRows, dispatch]);

    if(!families){
      setRows([...families]);
      console.log('families -> ', updatedRows)
    }

    useEffect(() => {
      setLoadRows(saveCompleted);
      console.log('studentId 1 -> ', studentId);
      dispatch(fetchFamilies(studentId));
      console.log('asdfsadfsadf')
    }, [saveCompleted, dispatch])

    const handleAddRow = (e) => {
        e.preventDefault();
        if(editingRow == families.length - 1) {
          setEditingRow(families.length);
          const newRows = families[editingRow];
          setFormData(newRows);
        }
        else {
          setEditingRow(families.length);
          setFormData({ id: 0, firstName: '', lastName: '', dateOfBirth: '', relationshipId: 0, nationality: 0 });
        }
    };

    const handleSaveRow = () => {
        const newRows = families[editingRow];
        console.log('newRows -> ', formData);
        handleFamilySave(formData);
        setLoadRows(true);
        setRows(newRows);
        setEditingRow(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <hr />
            <strong>Family Details</strong>
          <button onClick={handleAddRow} className='btn btn-sm btn-success mr-2 ' >
            Add Row
          </button>
          <hr />
          <Table bordered>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Relation</th>
                <th>Nationality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {families.map((row, index) => (
                <tr key={index}>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{formatDate(row.dateOfBirth)}</td>
                  <td>{row.relationshipId}</td>
                  <td>{row.nationality}</td>
                  <td>
                    {/* <Button variant="primary" onClick={() => setEditingRow(index)}>Edit</Button> */}
                    <button onClick={() => setEditingRow(index)} className='btn btn-sm btn-primary ' >
                        Edit
                    </button>
                  </td>
                </tr>
              ))}
              {editingRow !== null && (
                <tr>
                  <td>
                  <input type='text' name='firstName' className='form-control' placeholder='Enter first name' 
                                            value={formData.firstName || ''}
                                            onChange={handleChange}
                                        />
                  </td>
                  <td>
                  <input type='text' name='lastName' className='form-control' placeholder='Enter last email' 
                                            value={formData.lastName || ''}
                                            onChange={handleChange}
                                        />
                  </td>
                  <td>
                  <input type="date" name="dateOfBirth" className="form-control"  
                                            value={formatDate(formData.dateOfBirth) || ''}
                                            onChange={handleChange}
                                        />
                  </td>
                  <td>
                  
                    <select
                        name="relationshipId"
                        className='form-control'
                        // onChange={e => handleCitySelect(e)}
                        onChange={handleChange}
                        >
                        {relationshipList.map(relationship => (
                            <option key={relationship.relation} value={relationship.id}>
                            {relationship.relation}
                            </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <select
                        name="nationality"
                        className='form-control'
                        onChange={handleChange}
                        >
                        {nationalityList.map(nationality => (
                            <option key={nationality.countryName} value={nationality.id}>
                            {nationality.countryName}
                            </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    {/* <Button variant="success" onClick={handleSaveRow}>Save</Button> */}
                    <button onClick={handleSaveRow} className='btn btn-sm btn-success ' >
                        Save
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
    );
};

export default Family;