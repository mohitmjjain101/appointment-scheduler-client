import React from "react";
import Icon from './../assets/appointment-icon.svg'
import { useNavigate } from 'react-router-dom';
import { logout } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }


    return (
        <header className="bg-sky-600 text-white flex justify-between items-center px-10 py-6">
            <div className="flex flex-row">
                <img src={Icon} width={40} height={40} className="pr-3"></img>
                <h1 className="text-2xl">
                    Appointment Scheduler
                </h1>
            </div>
            <button
                className="bg-white text-black px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 hover:shadow-md transform hover:scale-105 transition duration-200 ease-in-out"
                onClick={handleLogout}
            >
                Logout
            </button>
        </header>
    );
}