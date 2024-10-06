
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your actual base URL

export async function submitPersonPetInfo(formData, uuid) {
  const response = await fetch(`${API_BASE_URL}/person-pet-info/${uuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers like Authorization if required
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function submitPatientIntake(formData, uuid) {
  const response = await fetch(`${API_BASE_URL}/intake-form/${uuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers like Authorization if required
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


export const fetchUserData = async (uuid) => {
  const response = await fetch(`${API_BASE_URL}/users/${uuid}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return await response.json();
};