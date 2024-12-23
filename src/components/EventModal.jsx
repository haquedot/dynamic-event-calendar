import React, { useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";

const EventModal = ({ selectedDate, events, onClose, onAddEvent, onDeleteEvent, onEditEvent }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdateEvent = () => {
    if (!eventName || !startTime || !endTime) return;

    if (editingIndex !== null) {
      onEditEvent(editingIndex, { name: eventName, startTime, endTime, description });
    } else {
      onAddEvent({ name: eventName, startTime, endTime, description });
    }

    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setEditingIndex(null);
  };

  const handleEditClick = (event, index) => {
    setEventName(event.name);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
    setEditingIndex(index);

  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="p-4">
        <div className="bg-white rounded p-6 max-w-lg w-full">
          <h2 className="text-lg font-bold mb-4">Events for {selectedDate}</h2>
          <ul>
            {events.map((event, idx) => (
              <li key={idx} className="bg-indigo-50 rounded p-2 flex justify-between items-center mb-2">
                <span>{event.name}</span>
                <div className="flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(event, idx)}
                  >
                    <FaPencil />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDeleteEvent(idx)}
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
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="time"
              className="border p-2 w-full mb-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="time"
              className="border p-2 w-full mb-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-2"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
              onClick={handleAddOrUpdateEvent}
            >
              {editingIndex !== null ? "Update Event" : "Add Event"}
            </button>
          </div>
          <button
            className="w-full mt-3 border border-indigo-100 text-indigo-500 py-2 rounded hover:bg-indigo-100"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
