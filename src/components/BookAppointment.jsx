import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

const doctors = [
  { id: 1, name: 'Dr. Maria', category: 'Doctor' },
  { id: 2, name: 'Dr. Peter', category: 'Doctor' },
  { id: 3, name: 'Dr. Eddie', category: 'Doctor' },
  { id: 4, name: 'Nurse Anne', category: 'Nurse' },
  { id: 5, name: 'Nurse John', category: 'Nurse' },
];

const generateRandomTimes = () => {
  const randomTimes = [];
  for (let i = 0; i < 5; i++) {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    randomTimes.push(time);
  }
  return randomTimes;
};

doctors.forEach((doctor) => {
  doctor.availableTimes = generateRandomTimes();
});

const BookAppointmentForm = ({ onSubmit, nextStep }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ symptoms });
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Symptom:
          <textarea
            value={symptoms}
            onChange={handleSymptomsChange}
            rows="4"
            cols="50"
          />
        </label>
        <button type="submit">Book</button>
      </form>
    </>
  );
};

const BookAppointmentModal = ({ isOpen, onClose, bookingDateTime, selectedDoctor, patientInfo }) => {
  const formatDateTime = (date) => {
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Booking successfully!</h2>
      {bookingDateTime && (
        <p>Date and Time: {formatDateTime(new Date(bookingDateTime))}</p>
      )}
      {selectedDoctor && (
        <p>Doctor: {selectedDoctor.name}</p>
      )}
      {patientInfo && (
        <p>Symptoms: {patientInfo.symptoms}</p>
      )}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

const TimePicker = ({ availableTimes, handleTimeSelection }) => {
  return (
    <select onChange={handleTimeSelection}>
      <option value="">Select a time</option>
      {availableTimes && availableTimes.map((time, index) => (
        <option key={index} value={time}>{time}</option>
      ))}
    </select>
  );
};

const Calendar = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
    />
  );
};

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedGeneralDoctor, setSelectedGeneralDoctor] = useState(null);
  const [selectedDistrictNurse, setSelectedDistrictNurse] = useState(null);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleGeneralDoctorChange = (e) => {
    const doctorId = parseInt(e.target.value, 10);
    const doctor = doctors.find(d => d.id === doctorId);
    setSelectedGeneralDoctor(doctor);
  };

  const handleDistrictNurseChange = (e) => {
    const doctorId = parseInt(e.target.value, 10);
    const doctor = doctors.find(d => d.id === doctorId);
    setSelectedDistrictNurse(doctor);
  };

  const handleSubmit = (bookingDetails) => {
    setTimeout(() => {
      setIsBookingSuccessful(true);
      openModal();
    }, 1000);

    console.log('Booking details:', {
      ...bookingDetails,
      selectedDate,
      selectedTime,
      selectedDoctor: selectedGeneralDoctor || selectedDistrictNurse,
    });

    setPatientInfo(bookingDetails);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setIsBookingSuccessful(false);
    setStep(1);
    setModalIsOpen(false);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const bookingContainerStyle = {
    marginLeft: '50px',
  };

  return (
    <div style={bookingContainerStyle}>
      <h1>Healthcare booking system</h1>
      {step === 1 && (
        <>
          <div className='dropdown-wrapper'>
            <label>
              Choose a general practitioner:
              <select onChange={handleGeneralDoctorChange}>
                <option value="">Choose a doctor</option>
                {doctors.filter(doctor => doctor.category === 'Doctor').map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className='dropdown-wrapper2'>
            <label>
              Choose a nurse:
              <select onChange={handleDistrictNurseChange}>
                <option value="">Choose a nurse</option>
                {doctors.filter(doctor => doctor.category === 'Nurse').map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={nextStep}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
          />
          <TimePicker
            availableTimes={(selectedGeneralDoctor || selectedDistrictNurse).availableTimes}
            handleTimeSelection={handleTimeSelection}
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={() => nextStep()}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <BookAppointmentForm onSubmit={handleSubmit} nextStep={nextStep} />
          <button onClick={prevStep}>Back</button>
        </>
      )}
      {step === 4 && isBookingSuccessful && (
        <BookAppointmentModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          bookingDateTime={selectedDate && selectedTime && new Date(`${selectedDate.toLocaleDateString()} ${selectedTime}`)}
          selectedDoctor={selectedGeneralDoctor || selectedDistrictNurse}
          patientInfo={patientInfo}
        />
      )}
    </div>
  );
};

export default BookAppointment;
