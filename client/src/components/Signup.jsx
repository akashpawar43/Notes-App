import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5555/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/')
            props.showAlert("account created Successfully", "teal")
        }
        else {
            props.showAlert("Invalid Details", "red")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <main className=" bg-gray-900">
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">
                        Sign up
                    </h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                                Name
                            </label>
                            <input value={credentials.name} onChange={onChange} id='name' name='name' type="name" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                                Email
                            </label>
                            <input value={credentials.email} onChange={onChange} id='email' name='email' type="email" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                                Password
                            </label>
                            <input value={credentials.password} onChange={onChange} id='password' name='password' type="password" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" minLength={5} required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="cpassword" className="block text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label>
                            <input value={credentials.cpassword} onChange={onChange} id='cpassword' name='cpassword' type="password" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                        <a href="#" className="text-xs text-purple-600 hover:underline">
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <Link to="/login" className="font-medium text-purple-600 hover:underline">
                            log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
