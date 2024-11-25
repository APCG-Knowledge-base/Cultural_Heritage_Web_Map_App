import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { getAuthToken } from '../util/auth';

function NewAdminEventPage() {
  const navigate = useNavigate();
  const token = getAuthToken();

  const saveEventHandler = async (eventData) => {
    const response = await fetch('http://localhost:8080/admin/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      navigate('/admin');
    } else {
      // Handle error
      console.error('Error adding event.');
    }
  };

  return (
    <div>
      <h1>Add New Event (Admin)</h1>
      <EventForm onSave={saveEventHandler} />
    </div>
  );
}

export default NewAdminEventPage;