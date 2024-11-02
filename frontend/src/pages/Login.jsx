import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();  // Initialize the navigate hook

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Account created successfully!");  // Display success toast
          navigate('/');  // Redirect to the home page after sign-up
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");  // Display success toast
          navigate('/');  // Redirect to the home page after login
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };




  return (
    <form className='min-h-[80vh] flex items-center justify-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-4 items-start p-8 min-w-[340px] sm:min-w-[400px] border border-gray-300 rounded-xl text-gray-700 text-sm shadow-md bg-white'>
        {/* Heading */}
        <p className='text-3xl font-semibold mb-2'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className='text-sm text-gray-500 mb-4'>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment.</p>

        {/* Name Input */}
        {state === 'Sign Up' && (
          <div className='w-full'>
            <label htmlFor='name' className='block text-gray-600 mb-1'>
              Full Name
            </label>
            <input
              className='border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              type='text'
              id='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Full Name'
              required
            />
          </div>
        )}

        {/* Email Input */}
        <div className='w-full'>
          <label htmlFor='email' className='block text-gray-600 mb-1'>
            Email
          </label>
          <input
            className='border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='example@mail.com'
            required
          />
        </div>

        {/* Password Input */}
        <div className='w-full'>
          <label htmlFor='password' className='block text-gray-600 mb-1'>
            Password
          </label>
          <input
            className='border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Your password'
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-primary text-white w-full py-2 rounded-md text-base font-medium hover:bg-primary-dark transition duration-300 mt-4'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle between Sign Up and Login */}
        <p className='text-center text-gray-500 mt-4'>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className='text-primary cursor-pointer underline'>
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer underline'>
                Sign up here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
