// /* This is only test page for arranging file structure of components you can delete this */

// import React, { useState, useEffect } from "react";

// function AdminTestPage() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

//   // Fetch availability data from backend or mock data
//   useEffect(() => {
//     // Fetch availability data based on selectedDate from the backend
//     // Example: fetch(`/availability?date=${selectedDate}`)
//     // Then update availableTimeSlots state
//     const mockData = [
//       "12:00 PM",
//       "12:15 PM",
//       "12:30 PM",
//       "12:45 PM",
//       "1:00 PM",
//       "1:15 PM",
//       "1:30 PM",
//       "1:45 PM",
//     ];
//     setAvailableTimeSlots(mockData);
//   }, [selectedDate]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleTimeSlotSelect = (timeSlot) => {
//     // Handle selected time slot
//     console.log("Selected time slot:", timeSlot);
//   };

//   return (
//     <div>
//       <h2>Schedule a Meeting</h2>
//       <DatePicker onChange={handleDateChange} />
//       <TimeSlotPicker
//         availableTimeSlots={availableTimeSlots}
//         onSelect={handleTimeSlotSelect}
//       />
//     </div>
//   );
// }

// function DatePicker({ onChange }) {
//   const [selectedDate, setSelectedDate] = useState("");

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
//     onChange(selectedDate);
//   };

//   return (
//     <div>
//       <label htmlFor="date">Select Date:</label>
//       <input
//         type="date"
//         id="date"
//         value={selectedDate}
//         onChange={handleDateChange}
//       />
//     </div>
//   );
// }

// function TimeSlotPicker({ availableTimeSlots, onSelect }) {
//   return (
//     <div>
//       <label>Select Time Slot:</label>
//       <ul>
//         {availableTimeSlots.map((timeSlot, index) => (
//           <li key={index}>
//             <button onClick={() => onSelect(timeSlot)}>{timeSlot}</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AdminTestPage;
