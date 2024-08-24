import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import BlogItem from '../BlogItem'

const Home = () => {
  const [blogsData, setBlogsData] = useState([])

  useEffect(() => {
    const fetchPostsData = async () => {
      const response = await axios.get("/getAllPosts")
      setBlogsData(response.data)
    }
    fetchPostsData()
  }, [])

  return (
    <div className="main">
      {/* Introductory Content */}
      <section className="intro-content">
        <h1>Welcome to the Blogger Platform</h1>
        <p>Explore a variety of blog posts from different authors. Whether you're interested in technology, lifestyle, or any other topic, there's something for everyone!</p>
        <p>Scroll down to discover the latest blog posts.</p>
      </section>

      {/* Display Blog Posts */}
      <section className="blogs-section">
        {blogsData.map(blog => (
          <BlogItem blog={blog} key={blog._id} />
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
          <p>Follow us on:
            <a href="https://twitter.com"> Twitter</a> |
            <a href="https://facebook.com"> Facebook</a> |
            <a href="https://instagram.com"> Instagram</a>
          </p>
          <p>Contact us: <a href="mailto:info@blogplatform.com">info@blogplatform.com</a></p>
        </div>
      </footer>
    </div>
  )
}

export default Home
