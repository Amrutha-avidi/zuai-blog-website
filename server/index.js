const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const User = require('./models/user')
const BlogPost = require('./models/blogPost')


const { hashPassword, comparePassword } = require("./helpers/auth")


const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
const PORT = 3003

connectDB()

//registering user
app.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName) {
            return res.json({
                error: 'name is required'
            })
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            })
        }
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'User with this email already exist'
            })
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        newUser.save()
        return res.json(newUser)

    } catch (err) {
        console.log(err.message)
    }

})

// user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }
        //chekc if passwords match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, userName: user.userName }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        } if (!match) {
            res.json({
                error: 'Passwords do not match'
            })
        }
    } catch (error) {
        console.log(error)

    }
})

// creating a post
app.post('/post', async (req, res) => {
    try {
        const { authorId, authorName, title, content, contentImage } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        if (!contentImage) {
            return res.status(400).json({ error: 'Content-related image is required' });
        }



        const newBlogPost = new BlogPost({
            authorId,

            authorName,
            title,
            content,
            contentImage,
            comments: [] // Default to an empty array
        });

        await newBlogPost.save();
        res.status(201).json({
            message: 'Blog post created successfully',
            blogPost: newBlogPost
        });

    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// getting all the available posts
app.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await BlogPost.find(); // Fetch all blog posts from the database
        res.status(200).json(posts); // Return the posts as JSON
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// getting the blog details by blog_id
app.get('/blogDetails/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await BlogPost.findById(blogId); // Fetch the post by ID from the database

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(blog); // Return the post as JSON
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// getting all the posts of the user
app.get('/posts/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userPosts = await BlogPost.find({ authorId: userId });
        if (userPosts.length === 0) {
            return res.status(404).json({ error: 'No posts found for this user' });
        }

        res.status(200).json(userPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// adding comment to the blog of blog_id = blog_id
app.post('/blogDetails/comments/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const { commenterName, comment } = req.body;

        // Validate input
        if (!commenterName || !comment) {
            return res.status(400).json({ error: 'Commenter name and comment are required' });
        }

        // Create a new comment
        const newComment = {
            commenterName,
            comment,
        };

        // Find the blog post and add the comment
        const blog = await BlogPost.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        blog.comments.push(newComment);
        await blog.save();

        res.status(200).json({  comment: newComment });
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Update a blog post
app.put('/editBlog/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;

        const updatedPost = await BlogPost.findByIdAndUpdate(blogId, {
            title,
            content,
        }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }


        res.status(200).json({ success: true, blogPost: updatedPost });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/post/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find the blog post and delete it
        const deletedBlogPost = await BlogPost.findByIdAndDelete(blogId);

        if (!deletedBlogPost) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get("/profile", (req, res) => {

    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
})

app.get('/', (req, res) => {
    res.json("its working")
})







app.listen(PORT, () => {
    console.log(`server is running fine on  http://localhost:${PORT}`)
})