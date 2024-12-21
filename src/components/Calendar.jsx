import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("calendarEvents"));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDayOfWeek = startOfMonth.day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleDayClick = (day) => {
    setSelectedDate(dayjs(currentDate).date(day).format("YYYY-MM-DD"));
    setShowModal(true);
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

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={prevMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={nextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="font-semibold">
            {day}
          </div>
        ))}
        {Array(startDayOfWeek)
          .fill("")
          .map((_, idx) => (
            <div key={idx}></div>
          ))}
        {days.map((day) => (
          <div
            key={day}
            className={`h-20 border p-2 hover:bg-blue-100 cursor-pointer ${
              dayjs(currentDate).date(day).isSame(dayjs(), "day")
                ? "bg-red-200"
                : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          events={events[selectedDate] || []}
          onClose={() => setShowModal(false)}
          onAddEvent={addEvent}
          onDeleteEvent={deleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
