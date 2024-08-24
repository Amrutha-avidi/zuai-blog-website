import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import './index.css';

const Profile = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams(); // Get user ID from URL
  const [authorPosts, setAuthorPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/${id}`);
        if (data) {
          setAuthorPosts(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [id]); // Fetch posts when the user ID changes

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`/post/${postId}`);
      console.log('Post deleted successfully:', response.data);
  
      // Optionally remove the deleted post from the local state
      setAuthorPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  if (error) return <p className="error-message">{error}</p>;
  if (authorPosts.length === 0) return <p className="no-posts-message">No posts available</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-header">{user.userName}'s Posts</h1>
      <h3 className="profile-username">These are the posts created by you</h3>
      <div className="posts-container">
        {authorPosts.map(post => (
          <div className="post-card" key={post._id}>
            <div className='post-content-image'>
              <div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <p className="post-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint labore maxime illum quibusdam delectus cupiditate possimus, oamet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint laamet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint labore maxime illum quibusdam delectus cupiditate possimus, obore maxime illum quibusdam delectus cupiditate possimus, omnis minus quas. Aperiam!</p>
                <img src={post.contentImage} alt={post.title} className="post-image-small" />


                <div className="comments-section">
                  <strong>Comments:</strong>
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div className="comment" key={index}>
                        <p><strong>{comment.author}:</strong> {comment.text}</p>
                        <p className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet</p>
                  )}
                </div>
              </div>
              <img src={post.contentImage} alt={post.title} className="post-image-large" />
            </div>

            <div className="buttons-section">
              <Link to={`/editBlog/${post._id}`} className='edit change-buttons'>EDIT</Link>
              <button className='delete change-buttons' onClick={() => handleDelete(post._id)}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
