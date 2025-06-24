import { FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

export default function AppointmentCard({ appointment, onEdit, onDelete }) {
  const { title, description, dateTime, duration, location } = appointment;

  return (
    <div className="group bg-white border-l-4 border-r-4 border-sky-600 shadow-sm rounded-xl p-5 transition-all hover:shadow-md hover:scale-[1.01] duration-200 relative">
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(appointment)}
          className="text-sky-600 hover:text-sky-800 p-1 rounded hover:bg-sky-100"
          title="Edit"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(appointment._id)}
          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100"
          title="Delete"
        >
          <FaTrash size={16} />
        </button>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-sky-700 mb-1">{title}</h3>

      {description && (
        <p className="text-gray-600 text-sm mb-3">{description}</p>
      )}

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Date:</span>{' '}
          {format(new Date(dateTime), 'dd MMM yyyy, hh:mm a')}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {duration} minutes
        </p>
        {location && (
          <p>
            <span className="font-medium">Location:</span> {location}
          </p>
        )}
      </div>
    </div>
  );
}
