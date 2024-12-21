import React, { useState } from "react";

const EventModal = ({ selectedDate, events, onClose, onAddEvent, onDeleteEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleAddEvent = () => {
    if (!eventDetails.name || !eventDetails.startTime || !eventDetails.endTime) {
      alert("All fields are required!");
      return;
    }
    onAddEvent(eventDetails);
    setEventDetails({ name: "", startTime: "", endTime: "", description: "" });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Events for {selectedDate}</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>
                {event.name} ({event.startTime} - {event.endTime})
              </span>
              <button
                className="text-red-500"
                onClick={() => onDeleteEvent(index)}
              >
                Delete
              </button>
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
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
