import React, { useState } from "react";
import Icon from './../assets/appointment-icon.svg'
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Singup = () => {
    const { error } = useSelector((state) => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSingup = async (e) => {
        e.preventDefault();
        const result = await dispatch(signupUser({ email, password }));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/dashboard")
        }
    }
    return (
        <div className="bg-gray-50">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-[480px] w-full bg-white border border-gray-200 shadow-sm rounded-2xl">
                    <div className=" flex items-center justify-center mt-6" >
                        <img src={Icon} width={40} height={40} />
                    </div>
                    <div className="p-6 sm:p-4 rounded-2xl  ">
                        <h1 className="text-slate-900 text-center text-3xl font-semibold">Register</h1>
                        {error && (
                            <div className="mb-4 text-red-600 border border-red-300 p-2 rounded bg-red-50">
                                {error}
                            </div>
                        )}
                        <form className="mt-12 space-y-6">
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input name="username" type="text" required className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter Email address" onChange={(e) => setEmail(e.target.value)} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                </div>
                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                                    <div className="relative flex items-center">
                                        <input name="password" type="password" required className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="!mt-12">
                                <button type="button" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-sky-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                                    onClick={handleSingup}
                                >
                                    Sing up
                                </button>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <p>If already have an account</p>
                                <Link to="/" className="text-sky-600 hover:text-sky-800 font-semibold ml-2">
                                    Login here
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singup