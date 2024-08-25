import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import './index.css';

const CommentsSection = ({ blog_id, comments }) => {
  const { user } = useContext(UserContext);
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [error, setError] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error state

    try {
      const response = await axios.post(`/blogDetails/comments/${blog_id}`, {
        commenterName: user.userName,
        comment: commentText
      });
      setCommentList((prevComments) => [...prevComments, response.data.comment]);
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Error posting comment');
    }
  };

  return (
    <div className="comments-section">
      <strong>Comments:</strong>
      <hr />
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" >
          Post Comment
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {commentList.length > 0 ? (
        <div>
          {commentList.map((each,index) => (
            <div className="comment" key={index}>
              <p style={{ fontStyle: "italic", color: "gray", fontSize: '18px' }}><strong style={{ color: 'black' }}>{each.commenterName}:</strong> {each.comment}</p>

            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default CommentsSection;
