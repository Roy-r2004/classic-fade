import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarberContext } from '../context/BarberContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setBToken } = useContext(BarberContext);  // Use BarberContext to manage Barber login

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      const loginUrl = backendUrl + (state === 'Admin' ? '/api/admin/login' : '/api/barber/login');
      const { data } = await axios.post(loginUrl, { email, password });

      if (data.success) {
        if (state === 'Admin') {
          // Admin login logic
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin login successful!');
        } else {
          // Barber login logic
          localStorage.setItem('bToken', data.token);
          localStorage.setItem('barberId', data.barberId); // Save barberId for future use
          setBToken(data.token);
          toast.success('Barber login successful!');
        }
      } else {
        toast.error(data.message || 'Login failed!');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred during login';
      toast.error(errorMsg);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            disabled={loading}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`bg-primary text-white w-full py-2 rounded-md text-base ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {state === 'Admin' ? (
          <p>
            Barber Login?{' '}
            <span className="text-primary underline cursor-pointer" onClick={() => setState('Barber')}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span className="text-primary underline cursor-pointer" onClick={() => setState('Admin')}>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
