import React from "react";
import { FaTimes } from "react-icons/fa";

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              <strong className="font-semibold">Start Time:</strong> {event.startTime}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">End Time:</strong> {event.endTime}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Description:</strong> {event.description}
            </p>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
