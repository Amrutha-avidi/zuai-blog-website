import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = ({ blog }) => {
    const { _id, authorName, title, content,contentImage } = blog
    return (
        <div className="blog-card" key={_id}>
            <div className="blog-author">{authorName}</div>
            <hr className="blog-divider" />
            <h1 className="blog-title">{title}</h1>
            <p className="blog-content">{content}</p>
            <img src={contentImage} alt={title} />
            <div className="blog-card-footer">
                <Link to={`/blogDetails/${_id}`} className="button">View Profile</Link>
            </div>
        </div>
    )
}

export default BlogItem