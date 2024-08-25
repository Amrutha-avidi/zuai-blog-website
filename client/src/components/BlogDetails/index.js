import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'
import CommentsSection from '../CommentsSection'

const BlogDetails = () => {
  const { blog_id } = useParams()
  const [blogDetails, setBlogDetails] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/blogDetails/${blog_id}`)
        setBlogDetails(response.data)
      } catch (error) {
        console.error('Error fetching blog details:', error)
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchBlogDetails()
  }, [blog_id])
  return (
    <>
      {loading ? (
        <p>Loading...</p> 
      ) : (
        blogDetails && (
          <div className="blogDetails-content-image">
            <div>
              <h3 className="blogDetails-title">{blogDetails.title}</h3>
              <p className="blogDetails-content">{blogDetails.content}</p>
              <p className="blogDetails-content">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laboriosam, temporibus quia quidem rem, hic harum nobis explicabo sint labore maxime illum quibusdam delectus cupiditate possimus, omnis minus quas. Aperiam!
              </p>
              <img src={blogDetails.contentImage} alt={blogDetails.title} className="blogDetails-image-small" />
              <CommentsSection blog_id={blog_id} comments={blogDetails.comments} />
            </div>
            <img src={blogDetails.contentImage} alt={blogDetails.title} className="blogDetails-image-large" />
          </div>
        )
      )}
    </>
  )
}

export default BlogDetails
