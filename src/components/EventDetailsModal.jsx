import React from "react";

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">Event Details</h2>
        <div className="mb-2">
          <strong>Name:</strong> <span>{event.name}</span>
        </div>
        <div className="mb-2">
          <strong>Start Time:</strong> <span>{event.startTime}</span>
        </div>
        <div className="mb-2">
          <strong>End Time:</strong> <span>{event.endTime}</span>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModal;