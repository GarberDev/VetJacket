import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../store/useAuth';
import '../../HospitalSide/Tables.css'
import { toast } from 'react-hot-toast';
import Button from '../../base/Button';

function PatientIntakes() {
    const [intakes, setIntakes] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]); // State to track expanded rows
    const { token } = useAuth();
    const copyExpandedContent = (intake) => {
        const textToCopy = `
What are we seeing your pet for today?: ${intake.question_1 || 'N/A'}
When did the problem start?: ${intake.question_2 || 'N/A'}
Is the problem same, better or worse?: ${intake.question_3 || 'N/A'}
Has this problem happened in the past?: ${intake.question_4 || 'N/A'}
Are any medications being administered?: ${intake.question_5 || 'N/A'}
What is the pet's current diet and feeding schedule?: ${intake.question_6 || 'N/A'}
Eating Changes? Increased, Decreased, or No change: ${intake.question_7 || 'N/A'}
Any noticeable weight loss?: ${intake.question_8 || 'N/A'}
Any increase or decrease in water consumption?: ${intake.question_9 || 'N/A'}
Any changes in bowel movements?: ${intake.question_10 || 'N/A'}
Any other medical history or recent changes?: ${intake.question_11 || 'N/A'}
`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success('Expanded content copied to clipboard!'); // Show success toast
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    useEffect(() => {
        if (!token) {
            console.log('No token available');
            return;
        }

        const fetchData = async () => {
            try {
                console.log(token);
                const response = await fetch("http://localhost:8000/api/patient-intake-info", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setIntakes(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]);

    const toggleRow = (id) => {
        setExpandedRows(expandedRows.includes(id)
            ? expandedRows.filter(rowId => rowId !== id)
            : [...expandedRows, id]);
    };

    const isRowExpanded = (id) => expandedRows.includes(id);

    return (
        <div className="patient-intakes-container">
            <h1>Patient Intakes</h1>
            <table className="patient-intakes-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Pet's Name</th>
                        <th>Primary Cell</th>
                        <th>Expand</th>
                    </tr>
                </thead>
                <tbody>
                    {intakes.map(intake => (
                        <React.Fragment key={intake.id}>
                            <tr>
                                <td>{`${intake.first_name} ${intake.last_name}`}</td>
                                <td>{intake.email}</td>
                                <td>{intake.pets_name}</td>
                                <td>{intake.primary_cell_number || 'N/A'}</td>
                                <td>
                                    <button onClick={() => toggleRow(intake.id)}>
                                        {isRowExpanded(intake.id) ? 'Show Less' : 'Show More'}
                                    </button>
                                </td>
                            </tr>

                            {isRowExpanded(intake.id) && (
    <tr className="expanded-row">
        <td colSpan="5">
            <div  className="expanded-content">
            <table> 
            <tbody>
                        <tr >
                            <td><strong>What are we seeing your pet for today?:</strong></td>
                            <td >{intake.question_1 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>When did the problem start?:</strong></td>
                            <td>{intake.question_2 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Is the problem same, better or worse?:</strong></td>
                            <td>{intake.question_3 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Has this problem happened in the past?:</strong></td>
                            <td>{intake.question_4 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Are any medications being administered?:</strong></td>
                            <td>{intake.question_5 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>What is the pet's current diet and feeding schedule?:</strong></td>
                            <td>{intake.question_6 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Eating Changes? Increased, Decreased, or No change:</strong></td>
                            <td>{intake.question_7 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Any noticeable weight loss?:</strong></td>
                            <td>{intake.question_8 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Any increase or decrease in water consumption?:</strong></td>
                            <td>{intake.question_9 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Any changes in bowel movements?:</strong></td>
                            <td>{intake.question_10 || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Any other medical history or recent changes?:</strong></td>
                            <td>{intake.question_11 || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
                <Button 
                variant='primary'
                onClick={() => copyExpandedContent(intake)}>Copy</Button>

            </div>
        </td>
    </tr>
)}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientIntakes;
