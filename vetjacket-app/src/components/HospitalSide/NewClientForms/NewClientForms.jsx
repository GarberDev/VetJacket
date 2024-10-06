import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../store/useAuth';
import '../../HospitalSide/Tables.css'

function NewClientForms() {
    const [clients, setClients] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            console.log('No token available');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/person-pet-info", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="client-forms-container">
            <h1>New Client Forms</h1>
            <table className="client-forms-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Primary Cell</th>
                        <th>Pet's Name</th>
                        <th>Pet's Breed</th>
                        <th>Pet's Age</th>
                        <th>Pet's Gender</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{`${client.first_name} ${client.last_name}`}</td>
                            <td>{client.email}</td>
                            <td>{client.address}</td>
                            <td>{client.primary_cell_number}</td>
                            <td>{client.pets_name}</td>
                            <td>{client.pets_breed}</td>
                            <td>{client.pet_age}</td>
                            <td>{client.pet_gender}</td>
                            <td>{new Date(client.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewClientForms;
