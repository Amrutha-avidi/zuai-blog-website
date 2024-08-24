import React, { useContext, useState } from 'react';
import './index.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../../context/userContext';

const Login = () => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [error,setError] = useState("")


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email, password
      })
      if (data.error) {
        setError(data.error)
      } else {
        setUser(data)
        setData({})
        
        alert("Login Successful")
        navigate("/")
      }

    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className='main-con'>
      <h1>Login</h1>
      <h2>Login using your credentials !! </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type="submit" className='login-button'>Login</button>
        <p>Didn't have an Account ? Please <Link to='/signup'>Register</Link></p>
        <p style={{color:'red',fontSize:"20px" }}>{error}</p>
      </form>
    </div>
  );
};

export default Login;
