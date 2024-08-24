import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: ''
  })
  
  const [error,setError] = useState("")



  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, email, password } = data
    try {
      const { data } = await axios.post('/signup', {
        userName, email, password
      })
      if (data.error) {
        setError(data.error)
      } else {
        setData({})
        navigate("/login")
      }
    } catch (error) {
      console.log("error")

    }

  };

  return (
    <div className='main-con'>
      <h1>Welcome to Blogger !</h1>
      <h2>Please Register</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}

          />
        </div>
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
        <button type="submit" className='login-button'>SignUp</button>
        <p>Already having an Account? Please <Link to='/login'>Login</Link></p>
        <p style={{color:'red',fontSize:"20px" }}>{error}</p>


      </form>
    </div>

  );
};

export default SignUp;
