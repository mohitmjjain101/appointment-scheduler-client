import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ScheduledForm from "../components/ScheduledForm";
import { useEffect, useState } from "react";
import { deleteAndEditAppointments, fetchAndCreateAppointments } from "../store/slices/appointmentSlice";
import AppointmentCard from "../components/AppointmentCard";
const Dashboard = () => {
    const [showForm, setShowForm] = useState("");
    const [appointToEdit, setAppointmentToEdit] = useState({})
    const { appointments } = useSelector(state => state.appointment);

    const dispatch = useDispatch();

    const deleteAppointment = async (id) => {
        await dispatch(deleteAndEditAppointments({ type: "delete", id: id }));
        dispatch(fetchAndCreateAppointments({ type: "fetchall" }))
    }

    const editAppointment = (appointment) => {
        setShowForm("Edit")
        setAppointmentToEdit(appointment)
    }

    useEffect(() => {
        dispatch(fetchAndCreateAppointments({ type: "fetchall" }))
    }, [])

    return (
        <div>
            <Header />
            {
                appointments?.length !== 0 &&
                (<div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">My Appointments</h1>
                        <button
                            onClick={() => setShowForm("create")}
                            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition"
                        >
                            + Book Appointment
                        </button>
                    </div>
                </div>)
            }
            {
                showForm === "create" && (
                    <ScheduledForm
                        onClose={async () => {
                            await dispatch(fetchAndCreateAppointments({ type: "fetchall" }));
                            setShowForm("")
                        }}
                    />
                )
            }
            {
                showForm === "Edit" && (
                    <ScheduledForm selectedAppointment={appointToEdit}
                        onClose={async () => {
                            console.log("iiiiiiiiiiiiiiiiiiiiiii")
                            await dispatch(fetchAndCreateAppointments({ type: "fetchall" }));
                            setShowForm("")
                        }}
                    />
                )
            }
            {
                appointments?.length === 0 ?
                    (<div className="text-center mt-10">
                        <p className="text-gray-600 mb-4">No appointments yet.</p>
                        <button
                            onClick={() => setShowForm("create")}
                            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-800"
                        >
                            Book Your First Appointment
                        </button>
                    </div>) : (
                        <div className="p-6">
                            <div className="grid gap-4">
                                {appointments?.map(appt => (
                                    <AppointmentCard key={appt._id} appointment={appt} onEdit={(appointment) => editAppointment(appointment)} onDelete={(id) => deleteAppointment(id)} />
                                ))}
                            </div>
                        </div>
                    )
            }


        </div>
    )
}

export default Dashboard