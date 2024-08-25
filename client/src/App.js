import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/userContext'; // Ensure proper import
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';

import BlogDetails from './components/BlogDetails'
import ProtectedRoute from './components/ProtectedRoute';

import Layout from './Layout';

import axios from 'axios';
// import './App.css'

axios.defaults.baseURL = 'https://zuai-blog-website-1.onrender.com';
axios.defaults.withCredentials = true;

const App = () => {

  return (
    <UserContextProvider> {/* Wrap the entire app */}
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>

            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/posts/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="/editBlog/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />

            <Route path="/blogDetails/:blog_id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />

            {/* <Route path="*" element={<Navigate to="/" />} /> Redirect unknown routes to home */}
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
