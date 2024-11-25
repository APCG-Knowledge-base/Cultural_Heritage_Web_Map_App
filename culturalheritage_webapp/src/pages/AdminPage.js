import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import "./AdminPage.css";

function AdminPage() {
  const [events, setEvents] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const navigate = useNavigate();
  const token = getAuthToken();
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/admin/events", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error fetching events:", error));
  }, [token]);

  const deleteEvent = (id) => {
    fetch(`http://localhost:8080/admin/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          setEvents(events.filter((event) => event.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  const ImageGallery2 = ({ imgurl, handleImageClick }) => (
    <div className="photos-containeradmin">
      <div className="img-containeradmin">
        <img
          src={imgurl}
          alt={`Photo`}
          onClick={() => handleImageClick(imgurl)}
        />
      </div>
    </div>
  );

  const handleImageClick = (url) => {
    setEnlargedImage(url);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Site Administration</h1>
        <div className="admin-actions">
          <span>Welcome, Admin</span>
          <span>Logout</span>
          <span>View</span>
        </div>
      </header>
      <div className="events-handler block">
        <h2>Events Handler</h2>
        <div className="top-buttons">
          <button onClick={() => navigate("/events")} className="admin-button">
            Add New Event
          </button>
          <button
            onClick={() => setShowPending(!showPending)}
            className="admin-button"
          >
            Show Pending Events
          </button>
        </div>
        {showPending && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Monument</th>
                <th>Description</th>
                <th>Date</th>
                <th>Source</th>
                <th>Photos</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.monument_reference}</td>
                  <td className="description-cell">{event.description}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td className="source-cell">{event.title}</td>
                  <td>
                    <ImageGallery2
                      imgurl={event.image}
                      handleImageClick={handleImageClick}
                    />
                  </td>
                  <td>
                    <span
                      className="edit-button"
                      onClick={() => navigate(`/edit-event/${event.id}`)}
                    >
                      <span className="icon">✏️</span> Edit
                    </span>
                    <span
                      className="delete-button"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <span className="icon">➖</span> Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {enlargedImage && (
          <div>
            <div className="backdrop" onClick={closeEnlargedImage}></div>
            <img
              src={enlargedImage}
              alt="Enlarged Photo"
              className="enlarged-image"
            />
          </div>
        )}
      </div>
      <div className="auth-section block">
        <h2>AUTHENTICATION AND AUTHORIZATION</h2>
        <div className="auth-item">
          <span>Groups</span>
          <div className="auth-buttons">
            <span>Add</span>
            <button className="auth-button add">+</button>
            <span>Change</span>
            <button className="auth-button change">-</button>
          </div>
        </div>
        <div className="auth-item">
          <span>Users</span>
          <div className="auth-buttons">
            <span>Add</span>
            <button className="auth-button add">+</button>
            <span>Change</span>
            <button className="auth-button change">-</button>
          </div>
        </div>
      </div>
      <div className="recent-actions block">
        <h2>Recent Actions</h2>
        <ul className="actions-list">
          <li>
            Event 1: Building 1982 Added
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
          <li>
            Event 2: Taras University Edited
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
          <li>
            Event 3: Events Updated in the map
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
          <li>
            Event 4: Event with id j43km4m4343m Deleted
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
          <li>
            Event 5: Event with id 32o2k3m2u44jjjn Edited
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
          <li>
            Event 6: Event with id j23n4jn34n Added
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
          <li>
            Event 7: Event with id kjsd9s9da Deleted
            <button className="action-edit-button" aria-label="Edit">
              ✏️
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
