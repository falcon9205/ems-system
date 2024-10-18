"use client"
import React, { useState } from 'react'
import { Quicksand } from 'next/font/google'

const roboto = Quicksand({
  weight: '500',
  subsets: ['latin'],
})

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <>
      <div className={`bg-black h-screen flex items-center justify-center ${roboto.className}`}>
        <section className='w-[90%] md:w-1/2 space-y-5 bg-teal-950 h-96 rounded-xl'>
          <h1 className='text-gray-400 text-center text-2xl font-bold'>Employee Login</h1>
          <p className='text-center text-gray-300 text-xs'>Switch to  <button className='text-yellow-500'>Admin Login</button></p>
          <form className="mx-2 md:w-full max-w-sm md:mx-auto bg-teal-800 p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>

            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                value={password} // Bind value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-black py-1 hover:text-black hover:bg-white border border-black flex mx-auto text-white px-2 rounded-md md:text-lg"
                type="submit"
              >
                Login
              </button>
            </div>
            <p className='text-center text-gray-300 text-xs my-2'>New to the platform? <button className='text-yellow-500'> Register Now </button></p>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login;
