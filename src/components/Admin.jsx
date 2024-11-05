import React, { useState } from 'react';
import AdminSignup from './AdminSignup';
import AdminLogin from './AdminLogin';
import AdminImage from '../Images/ADMIN.jpg';

const Admin = () => {
    const [toggle, setToggle] = useState("Login");

    const handleToggle = () => {
        setToggle(prevToggle => (prevToggle === "Login" ? "Signup" : "Login"));
    };

    return (
        <div className='mt-[4rem]'>
            <div className='grid md:grid-cols-2'>
                <div className='flex flex-col gap-4 items-center justify-center text-4xl'>
                    <div>Spread Your Knowledge<br /> With Others</div>

                    <div>
                        {toggle === "Login" ? <AdminLogin /> : <AdminSignup />}

                        <p className="pb-4 text-center text-sm text-gray-500">
                            {toggle === "Login" ? "Not a member?" : "Already a member?"}{' '}
                            <button 
                                onClick={handleToggle} 
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                {toggle === "Login" ? "Signup Here" : "Login Here"}
                            </button>
                        </p>
                    </div>
                </div>

                <div className='flex justify-center items-center'>
                    <img src={AdminImage} alt="Admin" />
                </div>
            </div>
        </div>
    );
};

export default Admin;