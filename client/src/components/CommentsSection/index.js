import React, { useState } from 'react'
import axios from 'axios'
import './index.css'

const CommentsSection = ({ blogId, comments }) => {
    const [commenterName, setCommenterName] = useState('');

  const [commentText, setCommentText] = useState('')
  const [commentList, setCommentList] = useState(comments)
  const [error, setError] = useState('')

  const handleCommentChange = (event) => {
    setCommentText(event.target.value)
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`/blogDetails/${blogId}/comments`, { text: commentText })
      setCommentList((prevComments) => [...prevComments, response.data])
      setCommentText('')
    } catch (error) {
      console.error('Error posting comment:', error)
      setError('Error posting comment')
    }
  }

  return (
    <div className="comments-section">
      <strong>Comments:</strong>
      <hr />
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {commentList.length > 0 ? (
        commentList.map((comment, index) => (
          <div className="comment" key={index}>
            <p><strong>{comment.author}:</strong> {comment.text}</p>
            <p className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    
    </div>
  )
}

export default CommentsSection
