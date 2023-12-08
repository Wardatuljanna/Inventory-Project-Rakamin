import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/index.css';
import registerImg from '../assest/tes/registrasi.png';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [submitted, setSubmitted] = useState(false); // Track whether the form is submitted
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    

    const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
        // Continue with registration
        const registrationResponse = await axios.post('https://backend-inventory-project-production.up.railway.app/auth/register', {
            name: name,
            role: role,
            email: email,
            password: password
        });

        // Handle successful registration response as needed
        const registrationData = registrationResponse.data;
        console.log('Registration successful:', registrationData);

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Akun Berhasil Dibuat',
            showConfirmButton: false,
            timer: 2000
        });

        // Additional actions after successful registration, e.g., redirect
        navigate("/");

    } catch (error) {
        console.error(error);
        if (error.response) {
            const errorMessage = error.response.data.message;

            // Check if the error message is about the email being used
            if (errorMessage === 'Email has been used') {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Sudah Digunakan',
                    text: 'Gunakan email lain untuk registrasi.'
                });
            } else {
                // Handle other error cases
                setMsg(errorMessage);
            }
        }
    }
};

    
    

    const navigateToLogin = () => {
        navigate("/login");
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
                <div className="bg-white flex flex-col justify-center">
                    <form onSubmit={handleRegister} className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg">
                        <h2 className="text-4xl text-black font-bold mb-2">Hello!</h2>
                        <p className="text-black mb-3">Sign Up to Get Started</p>
                        {msg && <p className="text-red-500 mb-4">{msg}</p>}
                        <div className="flex flex-col text-gray-600 py-2">
                        <label htmlFor="password">Name</label>
                            <input
                                className="flex-1 rounded-[30px] border mt-2 p-2 pl-10 text-gray-300 focus:border-grey-500 focus:outline-none"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                            />
                            {submitted && !name && <p className="text-red-500 mt-1">Name is required</p>}
                        </div>
                        <div className="flex flex-col text-gray-600 py-2">
                        <label htmlFor="password">Select Role</label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none rounded-[30px] border py-2 pl-3 pr-10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition duration-300"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    id="role"
                                    placeholder="Select your role"
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Staff">Staff</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            {submitted && !role && (
                                <p className="text-sm text-red-500 mt-1">Role is required</p>
                            )}
                        </div>
                        <div className="flex flex-col text-gray-600 py-2">
                        <label htmlFor="password">Email</label>
                            <input
                                className="flex-1 rounded-[30px] border mt-2 p-2 pl-10 focus:border-grey-500 text-gray-300 focus:outline-none"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                            />
                            {submitted && !email && <p className="text-red-500">Email is required</p>}
                        </div>
                        <div className="flex flex-col text-gray-600 py-2 relative">
                        <label htmlFor="password">Password</label>
                        <div className="relative flex">
                                <input 
                                    className= "flex-1 rounded-[30px] border mt-2 p-2 pl-10 text-gray-300 focus:border-grey-500 focus:outline-none"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Your Password"
                                />
                                <button 
                                    className="absolute left-72 p-3 mt-2"
                                    type="button"
                                    onClick={handleToggleShowPassword}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {submitted && !password && <p className="text-red-500">Password is required</p>}
                        </div>
                        <button className="w-full my-2 py-4 bg-black text-white font-semibold rounded-[30px] hover:bg-gray-800">
                            Register
                        </button>
                        <button className="w-full my-2 py-2 hover:text-gray-800 text-gray text-sm font-semibold rounded-lg" onClick={navigateToLogin}>
                            Back to Sign In
                        </button>
                    </form>
                </div>

                <div className="hidden sm:block">
                    <img className="w-full h-full object-cover" src={registerImg} alt=""></img>
                </div>
            </div>
        </section>
    );
}

export default Register;
