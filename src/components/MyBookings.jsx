import React, { useState } from "react";

const MyBookings = () => {
  const [selectedBookingIndex, setSelectedBookingIndex] = useState(0);
  const [selectedHistoryBookingIndex, setSelectedHistoryBookingIndex] =
    useState(0);

  const handleBookingChange = (event) => {
    setSelectedBookingIndex(event.target.value);
  };

  const handleHistoryBookingChange = (event) => {
    setSelectedHistoryBookingIndex(event.target.value);
  };

  const handleChangeAppointment = () => {
    console.log(
      "Change Appointment clicked for booking:",
      bookings[selectedBookingIndex]
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const bookings = [
    { doctor: "Dr. Smith", date: "2024-05-10" },
    { doctor: "Dr. Johnson", date: "2024-06-15" },
    { doctor: "Dr. Williams", date: "2024-07-20" },
  ];

  const bookingsHistory = [
    { doctor: "Dr. Rick", date: "2024-01-18" },
    { doctor: "Dr. Anna", date: "2024-07-22" },
    { doctor: "Dr. Peter", date: "2024-11-29" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
      }}
    >
      {/* My Bookings Section */}
      <div style={{ marginRight: "20px" }}>
        <h2>My Bookings</h2>
        <label htmlFor="bookingSelect">Select a Booking:</label>
        <select
          id="bookingSelect"
          value={selectedBookingIndex}
          onChange={handleBookingChange}
        >
          {bookings.map((booking, index) => (
            <option key={index} value={index}>
              Doctor: {booking.doctor}, Date: {formatDate(booking.date)}
            </option>
          ))}
        </select>
        {bookings.length > 0 && (
          <div>
            <p>
              <strong>Doctor:</strong> {bookings[selectedBookingIndex].doctor}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {formatDate(bookings[selectedBookingIndex].date)}
            </p>
          </div>
        )}
        <button 
         onClick={handleChangeAppointment}
         style={{ backgroundColor: "#259ec8", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer",marginTop: "20px" 
              }}
>
              Change Appointment
              </button>
        
      </div>

      <div>
        <h2>History Bookings</h2>
        <label htmlFor="historyBookingSelect">Select a Booking:</label>
        <select
          id="historyBookingSelect"
          value={selectedHistoryBookingIndex}
          onChange={handleHistoryBookingChange}
        >
          {bookingsHistory.map((booking, index) => (
            <option key={index} value={index}>
              Doctor: {booking.doctor}, Date: {formatDate(booking.date)}
            </option>
          ))}
        </select>
        {bookingsHistory.length > 0 && (
          <div>
            <p>
              <strong>Doctor:</strong>{" "}
              {bookingsHistory[selectedHistoryBookingIndex].doctor}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {formatDate(bookingsHistory[selectedHistoryBookingIndex].date)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
