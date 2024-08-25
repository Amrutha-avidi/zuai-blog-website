import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import BlogItem from '../BlogItem'
import SearchSection from '../SearchSection'
import Footer from '../Footer'



const Home = () => {
  const [blogsData, setBlogsData] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchPostsData = async () => {
      const response = await axios.get("/getAllPosts")
      setBlogsData(response.data)
    }
    fetchPostsData()
  }, [])

  const filteredBlogs = blogsData.filter(blog => 
    blog.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <div className="main">
      {/* Introductory Content */}
      <section className="intro-content">
        <h1>Welcome to the Blogger Platform</h1>
        <p>Explore a variety of blog posts from different authors. Whether you're interested in technology, lifestyle, or any other topic, there's something for everyone!</p>
        <p>Scroll down to discover the latest blog posts.</p>
      </section>
      
      <section className="search-content">
        <SearchSection searchInput={searchInput} setSearchInput={setSearchInput} />
      </section>

      {/* Display Blog Posts */}
      <section className="blogs-section">
        {filteredBlogs.map(blog => (
          <BlogItem blog={blog} key={blog._id} />
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
