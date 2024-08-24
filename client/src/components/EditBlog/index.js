import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './index.css'

const EditBlog = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams(); // Post ID from URL
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`/blogDetails/${id}`);
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                setError('Error fetching post details');
            }
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async () => {
        console.log("ASd")
        try {
            await axios.put(`/editBlog/${id}`, { title, content });
            navigate(`/posts/${user._id}`); // Redirect to the post details page or any other page
        } catch (error) {
            setError('Error updating post');
        }
    };

    if (error) return <p className="error-message">{error}</p>;
    return (
        <div className="edit-blog-con">
            <h1>Edit Post</h1>
            <div className='edit-con'>
                <div className='input-con'>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className='input-con'>
                    <label htmlFor='content'>Content</label>

                    <textarea
                        htmlFor='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                    />
                </div>

                <button className='edit-button ' onClick={handleUpdate}>Update Post</button>
            </div>
        </div>
    );
};

export default EditBlog;
