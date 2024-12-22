import React, { useEffect, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";

const EventModal = ({ selectedDate, events, onClose, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false); // Track if we are editing
  const [editingId, setEditingId] = useState(null); // Track the ID of the event being edited

  const handleAddOrUpdateEvent = () => {
    if (!eventDetails.name || !eventDetails.startTime || !eventDetails.endTime) {
      alert("All fields are required!");
      return;
    }

    if (editMode) {
      onUpdateEvent({ ...eventDetails, id: editingId });
    } else {
      onAddEvent({ ...eventDetails, id: new Date().getTime() });
    }

    setEventDetails({ name: "", startTime: "", endTime: "", description: "" });
    setEditMode(false);
    setEditingId(null);
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setEditingId(event.id);
    setEventDetails(event);
  };

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Events for {selectedDate}</h3>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-2 flex justify-between items-center bg-indigo-50 p-2 rounded">
              <span>
                {event.name} ({event.startTime} - {event.endTime})
              </span>
              <div className="flex items-center gap-4">
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => handleEdit(event)}
                >
                  <FaPencil />
                </button>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Event Name"
            className="border p-2 w-full mb-2"
            value={eventDetails.name}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, name: e.target.value })
            }
          />
          <input
            type="time"
            className="border p-2 w-full mb-2"
            value={eventDetails.startTime}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, startTime: e.target.value })
            }
          />
          <input
            type="time"
            className="border p-2 w-full mb-2"
            value={eventDetails.endTime}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, endTime: e.target.value })
            }
          />
          <textarea
            placeholder="Description (optional)"
            className="border p-2 w-full mb-2"
            value={eventDetails.description}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, description: e.target.value })
            }
          />
          <button
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            onClick={handleAddOrUpdateEvent}
          >
            {editMode ? "Update Event" : "Add Event"}
          </button>
        </div>
        <button
          className="w-full mt-3 px-4 py-2 border border-indigo-200 text-indigo-500 rounded hover:bg-indigo-200"
          onClick={() => {
            setEditMode(false);
            setEditingId(null);
            setEventDetails({ name: "", startTime: "", endTime: "", description: "" });
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
