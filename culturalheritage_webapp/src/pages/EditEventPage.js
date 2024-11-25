import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { getAuthToken } from '../util/auth';

function EditEventPage() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getAuthToken();

  useEffect(() => {
    fetch(`http://localhost:8080/events/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => setEvent(data.event))
      .catch(error => console.error('Error fetching event:', error));
  }, [id, token]);

  const saveEventHandler = async (eventData) => {
    const response = await fetch(`http://localhost:8080/admin/events/${id}`, {
      method: 'PATCH',
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
      console.error('Error updating event.');
    }
  };

  return (
    <div>
      <h1>Edit Event</h1>
      {event && <EventForm event={event} onSave={saveEventHandler} />}
    </div>
  );
}

export default EditEventPage;