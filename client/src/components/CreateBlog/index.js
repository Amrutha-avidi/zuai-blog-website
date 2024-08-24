import { useState, useContext } from 'react';
import './index.css';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    authorId:user._id,
    authorName: user.userName, // Set the author name from the user object
    title: '',
    content: '',
    contentImage: ''
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, contentImage } = formData;
    try {
      const { data } = await axios.post('/post', {
        authorId:formData.authorId,
        authorName: formData.authorName,
        title,
        content,
        contentImage
      });

      if (data.error) {
        setError(data.error);
      } else {
        // Do not reinitialize authorName; keep the existing one
        setFormData({
          ...formData, // Preserve authorName
          title: '',
          content: '',
          contentImage: ''
        });
        alert('Posted Blog Successfully');
        navigate(`/posts/${user._id}`)
      }
    } catch (error) {
      console.error('Error posting blog:', error);
      setError('Enter all the details');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{user.userName}</h1>

      <div>
        <label htmlFor="title">Blog Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="contentImage">Content Image URL:</label>
        <input
          type="text"
          id="contentImage"
          name="contentImage"
          value={formData.contentImage}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit Blog Post</button>
      <p style={{color:'red', fontSize:'20px'}}>{error}</p>
    </form>
  );
}

export default CreateBlog;
