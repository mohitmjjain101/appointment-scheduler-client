import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAndEditAppointments, fetchAndCreateAppointments } from "../store/slices/appointmentSlice";

const ScheduledForm = ({ selectedAppointment, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: new Date().toISOString().substring(0,10),
    duration: '',
    location: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.dateTime) newErrors.dateTime = 'Date and time are required.';
    else if (new Date(formData.dateTime) < new Date()) newErrors.dateTime = 'Select a future time.';
    if (!formData.duration) newErrors.duration = 'Duration is required.';
    else if (isNaN(formData.duration) || formData.duration <= 0) newErrors.duration = 'Enter a valid duration.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const action = selectedAppointment
      ? deleteAndEditAppointments({ type: "update", id: selectedAppointment._id, ...formData })
      : fetchAndCreateAppointments({ type: "create", ...formData });

    await dispatch(action);
    onClose();
  };

  useEffect(() => {
    if (selectedAppointment) {
      setFormData({
        title: selectedAppointment.title || '',
        description: selectedAppointment.description || '',
        dateTime: selectedAppointment.dateTime?.slice(0, 16),
        duration: selectedAppointment.duration || '',
        location: selectedAppointment.location || ''
      });
    }
  }, [selectedAppointment]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        onClick={onClose}
        title="Close"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4 text-center">
        {selectedAppointment ? `Edit Appointment` : 'Book Appointment'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <div>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            className={`w-full p-2 border rounded ${errors.dateTime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dateTime && <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>}
        </div>

        <div>
          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes) *"
            value={formData.duration}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>

        <div>
          <input
            type="text"
            name="location"
            placeholder="Location or meeting link"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-800 transition"
          >
            {selectedAppointment ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduledForm;
