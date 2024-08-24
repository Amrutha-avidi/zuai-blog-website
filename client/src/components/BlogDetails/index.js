import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'

const BlogDetails = () => {
  const { blog_id } = useParams()
  const [blogDetails, setBlogDetails] = useState(null)

  console.log(blog_id)

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/blogDetails/${blog_id}`)
        setBlogDetails(response.data)
      } catch (error) {
        console.error('Error fetching blog details:', error)
      }
    }

    fetchBlogDetails()
  }, [blog_id])
  console.log(blogDetails)

  return (
    <>
    {blogDetails?(<div className='blogDetails-content-image'>
      <div>
        <h3 className="blogDetails-title">{blogDetails.title}</h3>
        <p className="blogDetails-content">{blogDetails.content}</p>
        <p className="blogDetails-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint labore maxime illum quibusdam delectus cupiditate possimus, oamet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint laamet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint labore maxime illum quibusdam delectus cupiditate possimus, obore maxime illum quibusdam delectus cupiditate possimus, omnis minus quas. Aperiam!</p>
        <img src={blogDetails.contentImage} alt={blogDetails.title} className="blogDetails-image-small" />


        <div className="comments-section">
          <strong>Comments:</strong>
         
         
          {blogDetails.comments.length > 0 ? (
            blogDetails.comments.map((comment, index) => (
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
      <img src={blogDetails.contentImage} alt={blogDetails.title} className="blogDetails-image-large" />
    </div>) : <p>Loading</p>}
    </>
  )
}

export default BlogDetails