import React, { useState, useEffect, useMemo } from "react";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import EventDetailsModal from "./EventDetailsModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem("calendarEvents"));
      return storedEvents || {};
    } catch {
      return {};
    }
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const startOfMonth = useMemo(() => currentDate.startOf("month"), [currentDate]);
  const endOfMonth = useMemo(() => currentDate.endOf("month"), [currentDate]);
  const daysInMonth = endOfMonth.date();
  const startDayOfWeek = startOfMonth.day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleDayClick = (day) => {
    const date = dayjs(currentDate).date(day).format("YYYY-MM-DD");
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const addEvent = (event) => {
    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), event],
    }));
  };

  const deleteEvent = (index) => {
    const updatedEvents = [...(events[selectedDate] || [])];
    updatedEvents.splice(index, 1);
    setEvents((prev) => ({
      ...prev,
      [selectedDate]: updatedEvents,
    }));
  };

  const editEvent = (index, updatedEvent) => {
    const updatedEvents = [...(events[selectedDate] || [])];
    updatedEvents[index] = updatedEvent;
    setEvents((prev) => ({
      ...prev,
      [selectedDate]: updatedEvents,
    }));
  };

  const days = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

  return (
    <>
      <div className="block md:flex gap-3">
        <div className="md:w-3/4 mx-auto mb-8 p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={prevMonth}
            >
              <FaArrowLeft /> <span className="hidden md:block">Previous</span>
            </button>
            <h2 className="text-md md:text-xl font-bold flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-500" /> {currentDate.format("MMMM YYYY")}
            </h2>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={nextMonth}
            >
              <span className="hidden md:block">Next</span> <FaArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <div key={idx} className="font-semibold text-gray-700">
                {day}
              </div>
            ))}
            {Array(startDayOfWeek)
              .fill("")
              .map((_, idx) => (
                <div key={idx}></div>
              ))}
            {days.map((day) => {
              const date = dayjs(currentDate).date(day).format("YYYY-MM-DD");
              const hasEvents = Array.isArray(events[date]) && events[date].length > 0;

              return (
                <div
                  key={day}
                  className={`flex flex-col justify-center h-12 md:h-20 border p-1 md:p-2 hover:bg-indigo-100 cursor-pointer ${
                    dayjs(date).isSame(dayjs(), "day") ? "bg-indigo-500 hover:bg-indigo-600 text-white" : ""
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                  {hasEvents && (
                    <div
                      className={`mt-1 text-[8px] md:text-xs ${
                        dayjs(date).isSame(dayjs(), "day") ? "text-white" : "text-indigo-500"
                      }`}
                    >
                      Events
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {showModal && (
            <EventModal
              selectedDate={selectedDate}
              events={events[selectedDate] || []}
              onClose={() => setShowModal(false)}
              onAddEvent={addEvent}
              onDeleteEvent={deleteEvent}
              onEditEvent={editEvent}

            />
          )}
        </div>

        <div className="md:w-1/4 md:min-h-screen border-t md:border-t-0 md:border-l border-indigo-200 p-4">
          <h1 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
            <FaCalendarAlt /> Events
          </h1>
          <ul>
            {Object.keys(events).length === 0 ? (
              <p className="text-gray-500 text-sm mt-4">No events added yet. Click on a date to add events!</p>
            ) : (
              Object.keys(events).map((date) => (
                <li key={date} className="bg-indigo-50 rounded p-2 my-2">
                  <h2 className="text-xs text-indigo-500 font-semibold mb-1">{date}</h2>
                  <ul>
                    {Array.isArray(events[date]) &&
                      events[date].map((event, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between text-sm bg-white rounded shadow-sm p-2 my-1 cursor-pointer hover:bg-indigo-100"
                          onClick={() => handleEventClick(event)}
                        >
                          <p>{event.name}</p>
                          <p>
                            {event.startTime} - {event.endTime}
                          </p>
                        </li>
                      ))}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {showEventModal && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </>
  );
};

export default Calendar;
