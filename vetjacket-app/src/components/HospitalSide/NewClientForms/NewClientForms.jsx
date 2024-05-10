import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../store/useAuth';

function NewClientForms() {
    const [clients, setClients] = useState([]);
    const { token } = useAuth(); // Access token from context
    useEffect(() => {
        if (!token) {
            console.log('No token available');
            return; // If no token, do not attempt to fetch
        }

        const fetchData = async () => {
            try {
                console.log(token)
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
                console.log("data", data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]); // Depend on token to re-fetch when it changes

    return (
        <div>
            <h1>New Client Forms</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{`${client.first_name} ${client.last_name}`}</td>
                            <td>{client.email}</td>
                            <td>{client.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewClientForms;
